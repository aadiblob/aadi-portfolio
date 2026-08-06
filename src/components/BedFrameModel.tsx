"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type BedFrameModelProps = {
  packed: boolean;
  onTransitionChange?: (active: boolean) => void;
};

type Member = {
  object: THREE.Object3D;
  assembledPosition: THREE.Vector3;
  assembledQuaternion: THREE.Quaternion;
  packedPosition: THREE.Vector3;
  packedQuaternion: THREE.Quaternion;
  delay: number;
  kind: "longitudinal" | "transverse";
};

const LONGITUDINAL = new THREE.Vector3(1.905, 0.1016, 0.0508);
const TRANSVERSE = new THREE.Vector3(1.0668, 0.2032, 0.0508);
const TRANSITION_MS = 1400;
type Axis = "x" | "y" | "z";

function sortedDimensions(size: THREE.Vector3) {
  return [size.x, size.y, size.z].sort((a, b) => b - a);
}

function dimensionScore(size: THREE.Vector3, target: THREE.Vector3) {
  const measured = sortedDimensions(size);
  const expected = sortedDimensions(target);
  return measured.reduce((sum, value, index) => sum + Math.abs(value - expected[index]) / expected[index], 0);
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function createWoodTexture(renderer: THREE.WebGLRenderer) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.fillStyle = "#b38d62";
  context.fillRect(0, 0, canvas.width, canvas.height);
  let seed = 1741;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let index = 0; index < 95; index += 1) {
    const x = random() * canvas.width;
    const width = 0.35 + random() * 1.2;
    const alpha = 0.025 + random() * 0.055;
    context.beginPath();
    context.moveTo(x, -10);
    context.bezierCurveTo(x + random() * 8 - 4, 150, x + random() * 10 - 5, 360, x + random() * 8 - 4, 522);
    context.strokeStyle = `rgba(${random() > 0.42 ? "67, 43, 24" : "241, 222, 188"}, ${alpha})`;
    context.lineWidth = width;
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.4, 4.5);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.needsUpdate = true;
  return texture;
}

export function BedFrameModel({ packed, onTransitionChange }: BedFrameModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestedPackedRef = useRef(packed);
  const transitionCallbackRef = useRef(onTransitionChange);
  const runtimeRef = useRef<{ setState: (nextPacked: boolean) => void } | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    requestedPackedRef.current = packed;
    runtimeRef.current?.setState(packed);
  }, [packed]);

  useEffect(() => {
    transitionCallbackRef.current = onTransitionChange;
  }, [onTransitionChange]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xf3eee5, 0x15120f, 1.65));
    const key = new THREE.DirectionalLight(0xfff3df, 4.1);
    key.position.set(3.4, 4.8, 3.1);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.00035;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd7e0e4, 1.25);
    fill.position.set(-2.5, 1.6, 3.2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xcbd2d2, 2.15);
    rim.position.set(-3.2, 3, -2.6);
    scene.add(rim);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const displayRoot = new THREE.Group();
    const centeringGroup = new THREE.Group();
    displayRoot.add(centeringGroup);
    scene.add(displayRoot);
    const woodTexture = createWoodTexture(renderer);
    const woodMaterials: THREE.MeshPhysicalMaterial[] = [];
    const shadowMaterial = new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.24 });
    const groundGeometry = new THREE.PlaneGeometry(1, 1);
    const ground = new THREE.Mesh(groundGeometry, shadowMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.visible = false;
    scene.add(ground);
    let members: Member[] = [];
    let model: THREE.Object3D | null = null;
    let animationFrame = 0;
    let disposed = false;
    let transition: { start: number; fromPacked: boolean; toPacked: boolean } | null = null;
    let currentPacked = false;
    let verticalAxis: Axis = "y";
    let modelRadius = 1;
    let lastFitDistance = 0;
    let assembledGroundY = 0;
    let packedGroundY = 0;

    const fitCamera = (initial = false) => {
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const limitingFov = Math.min(verticalFov, horizontalFov);
      const fitDistance = (modelRadius / Math.sin(limitingFov / 2)) * 1.15;
      const currentDistance = camera.position.distanceTo(controls.target);
      const zoomRatio = !initial && lastFitDistance > 0 ? currentDistance / lastFitDistance : 1;
      const distance = THREE.MathUtils.clamp(fitDistance * zoomRatio, fitDistance * 0.72, fitDistance * 2.8);
      const direction = initial || currentDistance < 0.001
        ? new THREE.Vector3(1.25, 0.72, 1.35).normalize()
        : camera.position.clone().sub(controls.target).normalize();
      camera.position.copy(direction.multiplyScalar(distance));
      camera.near = Math.max(0.01, fitDistance / 100);
      camera.far = fitDistance * 12;
      camera.updateProjectionMatrix();
      controls.minDistance = fitDistance * 0.72;
      controls.maxDistance = fitDistance * 2.8;
      lastFitDistance = fitDistance;
      controls.update();
    };

    const applyProgress = (rawProgress: number, fromPacked: boolean, toPacked: boolean) => {
      members.forEach((member) => {
        const delay = toPacked
          ? (member.kind === "longitudinal" ? member.delay : 0.08)
          : (member.kind === "transverse" ? 0 : 0.1 + member.delay);
        const local = THREE.MathUtils.clamp((rawProgress - delay) / (1 - delay), 0, 1);
        const t = toPacked ? easeInOut(local) : 1 - easeInOut(local);
        member.object.position.lerpVectors(member.assembledPosition, member.packedPosition, t);
        member.object.quaternion.slerpQuaternions(member.assembledQuaternion, member.packedQuaternion, t);

        // A small vertical arc separates the members before lateral movement.
        const lift = member.kind === "longitudinal" ? Math.sin(t * Math.PI) * 0.085 : Math.sin(t * Math.PI) * 0.035;
        member.object.position[verticalAxis] += lift;
      });
      const packedProgress = easeInOut(toPacked ? rawProgress : 1 - rawProgress);
      ground.position.y = THREE.MathUtils.lerp(assembledGroundY, packedGroundY, packedProgress);
    };

    const setState = (nextPacked: boolean) => {
      if (!members.length || transition || nextPacked === currentPacked) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        applyProgress(1, currentPacked, nextPacked);
        currentPacked = nextPacked;
        return;
      }
      controls.enabled = false;
      transition = { start: performance.now(), fromPacked: currentPacked, toPacked: nextPacked };
      transitionCallbackRef.current?.(true);
    };
    runtimeRef.current = { setState };

    new GLTFLoader().load(
      "/models/lowprofile-bed.glb",
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;
        centeringGroup.add(model);
        model.updateMatrixWorld(true);

        let occurrenceContainer: THREE.Object3D | null = null;
        model.traverse((candidate) => {
          if (occurrenceContainer || candidate.children.length !== 13) return;
          const directChildrenContainMeshes = candidate.children.every((child) => {
            let hasMesh = false;
            child.traverse((descendant) => { if (descendant instanceof THREE.Mesh) hasMesh = true; });
            return hasMesh;
          });
          if (directChildrenContainMeshes) occurrenceContainer = candidate;
        });
        const container: THREE.Object3D = occurrenceContainer ?? model;
        const occurrences = container.children.filter((child) => {
          let hasMesh = false;
          child.traverse((descendant) => { if (descendant instanceof THREE.Mesh) hasMesh = true; });
          return hasMesh;
        });
        const measured = occurrences.map((object) => {
          const box = new THREE.Box3().setFromObject(object);
          return { object, size: box.getSize(new THREE.Vector3()), center: box.getCenter(new THREE.Vector3()) };
        });

        const ranked = measured
          .map((item) => ({ ...item, longitudinalScore: dimensionScore(item.size, LONGITUDINAL), transverseScore: dimensionScore(item.size, TRANSVERSE) }))
          .sort((a, b) => (a.longitudinalScore - a.transverseScore) - (b.longitudinalScore - b.transverseScore));
        const longitudinal = ranked.slice(0, 9);
        const transverse = ranked.slice(9).sort((a, b) => a.center.z - b.center.z || a.center.x - b.center.x);
        longitudinal.sort((a, b) => a.center.x - b.center.x);

        const fullBox = new THREE.Box3();
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.visible && child.geometry.getAttribute("position")) {
            fullBox.expandByObject(child, true);
          }
        });
        const center = fullBox.getCenter(new THREE.Vector3());
        const fullSize = fullBox.getSize(new THREE.Vector3());
        const axes: Axis[] = ["x", "y", "z"];
        verticalAxis = axes.reduce((smallest, axis) => fullSize[axis] < fullSize[smallest] ? axis : smallest);
        const horizontalAxes = axes.filter((axis) => axis !== verticalAxis).sort((a, b) => fullSize[a] - fullSize[b]);
        const lateralAxis = horizontalAxes[0];
        const lengthAxis = horizontalAxes[1];
        longitudinal.sort((a, b) => a.center[lateralAxis] - b.center[lateralAxis]);
        transverse.sort((a, b) => a.center[lengthAxis] - b.center[lengthAxis] || a.center[lateralAxis] - b.center[lateralAxis]);

        const allOrdered = [...longitudinal, ...transverse];
        members = allOrdered.map((item, index) => {
          const kind = index < 9 ? "longitudinal" as const : "transverse" as const;
          const parent = item.object.parent ?? container;
          const currentCenter = parent.worldToLocal(item.center.clone());
          const assemblyCenter = parent.worldToLocal(center.clone());
          const desiredCenter = assemblyCenter.clone();
          desiredCenter[lateralAxis] += kind === "transverse" ? (index - 10.5) * 0.22 : 0;
          desiredCenter[lengthAxis] += kind === "transverse" ? 0.1 : 0;
          desiredCenter[verticalAxis] += kind === "longitudinal" ? (index - 4) * 0.058 : -0.34;
          const packedPosition = item.object.position.clone().add(desiredCenter.sub(currentCenter));
          const packedQuaternion = item.object.quaternion.clone();
          const rotationAxis = new THREE.Vector3(verticalAxis === "x" ? 1 : 0, verticalAxis === "y" ? 1 : 0, verticalAxis === "z" ? 1 : 0);
          if (kind === "transverse") packedQuaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(rotationAxis, Math.PI / 2));
          return {
            object: item.object,
            assembledPosition: item.object.position.clone(),
            assembledQuaternion: item.object.quaternion.clone(),
            packedPosition,
            packedQuaternion,
            delay: kind === "longitudinal" ? index * 0.022 : 0.08,
            kind,
          };
        });

        occurrences.forEach((occurrence, index) => {
          const tone = 0.94 + ((index * 37) % 9) * 0.012;
          const material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#b68f64").multiplyScalar(tone),
            map: woodTexture,
            bumpMap: woodTexture,
            bumpScale: 0.006,
            roughnessMap: woodTexture,
            roughness: 0.58,
            metalness: 0,
            clearcoat: 0.08,
            clearcoatRoughness: 0.72,
          });
          woodMaterials.push(material);
          occurrence.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            child.material = material;
            child.castShadow = true;
            child.receiveShadow = true;
          });
        });
        centeringGroup.position.copy(center).multiplyScalar(-1);
        displayRoot.rotation.x = -Math.PI / 2;
        displayRoot.rotation.y = -0.16;
        displayRoot.updateMatrixWorld(true);

        const assembledDisplayBox = new THREE.Box3().setFromObject(displayRoot);
        const assembledSphere = assembledDisplayBox.getBoundingSphere(new THREE.Sphere());
        modelRadius = assembledSphere.radius + assembledSphere.center.length();
        assembledGroundY = assembledDisplayBox.min.y - 0.012;

        members.forEach((member) => {
          member.object.position.copy(member.packedPosition);
          member.object.quaternion.copy(member.packedQuaternion);
        });
        displayRoot.updateMatrixWorld(true);
        const packedDisplayBox = new THREE.Box3().setFromObject(displayRoot);
        packedGroundY = packedDisplayBox.min.y - 0.012;
        const packedSphere = packedDisplayBox.getBoundingSphere(new THREE.Sphere());
        modelRadius = Math.max(modelRadius, packedSphere.radius + packedSphere.center.length());
        members.forEach((member) => {
          member.object.position.copy(member.assembledPosition);
          member.object.quaternion.copy(member.assembledQuaternion);
        });
        displayRoot.updateMatrixWorld(true);

        ground.scale.setScalar(modelRadius * 4.5);
        ground.position.y = assembledGroundY;
        ground.visible = true;
        fitCamera(true);
        setStatus("ready");
        currentPacked = false;
        if (requestedPackedRef.current) setState(true);
      },
      undefined,
      (error) => {
        console.error("Bed-frame model failed to load", error);
        if (!disposed) setStatus("error");
      },
    );

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (status === "ready" || members.length) fitCamera(false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const render = (now: number) => {
      if (disposed) return;
      animationFrame = requestAnimationFrame(render);
      if (transition) {
        const progress = THREE.MathUtils.clamp((now - transition.start) / TRANSITION_MS, 0, 1);
        applyProgress(progress, transition.fromPacked, transition.toPacked);
        if (progress >= 1) {
          currentPacked = transition.toPacked;
          transition = null;
          controls.enabled = true;
          transitionCallbackRef.current?.(false);
        }
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      runtimeRef.current = null;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      controls.dispose();
      model?.traverse((child) => {
        if (child instanceof THREE.Mesh) child.geometry.dispose();
      });
      woodMaterials.forEach((material) => material.dispose());
      woodTexture?.dispose();
      groundGeometry.dispose();
      shadowMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={mountRef} className="bed-model-mount" role="img" aria-label="Interactive 3D model of the Japanese Joinery Modular Bedframe">
      {status === "loading" && <span className="bed-model-status">Loading 3D assembly</span>}
      {status === "error" && <span className="bed-model-status">3D model unavailable</span>}
    </div>
  );
}
