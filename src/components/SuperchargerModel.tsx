"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type SuperchargerModelProps = {
  src?: string;
  label?: string;
  className?: string;
  autoRotate?: boolean;
  modelScale?: number;
  exploded?: boolean;
};

type MaterialRole = "housing" | "gold" | "accessory" | "drive" | "hardware";

type ExplosionPart = {
  object: THREE.Object3D;
  basePosition: THREE.Vector3;
  offset: THREE.Vector3;
  start: number;
  end: number;
};

type ViewerRuntime = {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  parts: ExplosionPart[];
  explodeProgress: number;
  explodeTarget: number;
  cameraGoal: THREE.Vector3;
  targetGoal: THREE.Vector3;
  cameraTransitioning: boolean;
};

type ExplosionConfig = {
  index: number;
  offset: [number, number, number];
  start: number;
  end: number;
};

const ASSEMBLED_CAMERA = new THREE.Vector3(0, 0.96, 2.58);
const EXPLODED_CAMERA = new THREE.Vector3(0.36, 1.22, 3.72);
const ASSEMBLED_TARGET = new THREE.Vector3(0, 0, 0);
const EXPLODED_TARGET = new THREE.Vector3(0.36, 0.22, 0.16);

// These indexes match the 21 top-level Onshape occurrences in the uploaded GLB.
// Offsets are expressed in the original Onshape assembly axes before the web-view
// basis correction: X separates the two rotor lines, Y follows the shaft axis,
// and Z is physical vertical. Staggered windows create a readable sequence rather
// than making all 21 parts jump at the same time.
const EXPLOSION_CONFIG: ExplosionConfig[] = [
  { index: 0, offset: [0, -0.004, 0.092], start: 0.02, end: 0.34 }, // housing lifts
  { index: 2, offset: [0, -0.068, 0], start: 0.14, end: 0.44 }, // rear plate
  { index: 7, offset: [0.004, -0.088, 0], start: 0.18, end: 0.48 },
  { index: 18, offset: [-0.004, -0.088, 0], start: 0.18, end: 0.48 },
  { index: 1, offset: [0.021, -0.006, 0], start: 0.25, end: 0.57 }, // rotor A
  { index: 6, offset: [0.021, -0.004, 0], start: 0.25, end: 0.57 }, // shaft A
  { index: 13, offset: [-0.021, -0.006, 0], start: 0.25, end: 0.57 }, // rotor B
  { index: 16, offset: [-0.021, -0.004, 0], start: 0.25, end: 0.57 }, // shaft B
  { index: 9, offset: [0, 0.052, 0], start: 0.34, end: 0.64 }, // front plate
  { index: 8, offset: [0.004, 0.069, 0], start: 0.38, end: 0.68 },
  { index: 14, offset: [-0.004, 0.069, 0], start: 0.38, end: 0.68 },
  { index: 15, offset: [0, 0.086, 0], start: 0.43, end: 0.72 }, // timing plate
  { index: 4, offset: [0.011, 0.111, 0], start: 0.5, end: 0.78 }, // timing gear A
  { index: 20, offset: [-0.011, 0.111, 0], start: 0.5, end: 0.78 }, // timing gear B
  { index: 3, offset: [0.011, 0.127, 0], start: 0.54, end: 0.81 },
  { index: 19, offset: [-0.011, 0.127, 0], start: 0.54, end: 0.81 },
  { index: 5, offset: [0, 0.142, 0], start: 0.58, end: 0.84 },
  { index: 11, offset: [0, 0.169, 0], start: 0.62, end: 0.89 }, // snout housing
  { index: 17, offset: [0, 0.186, 0], start: 0.66, end: 0.92 },
  { index: 12, offset: [0, 0.213, 0], start: 0.7, end: 0.96 }, // drive shaft
  { index: 10, offset: [0, 0.247, 0], start: 0.75, end: 1 }, // pulley
];

function getSourceColor(source: THREE.MeshStandardMaterial): THREE.Color {
  return source.color.clone();
}

function classifyMaterial(source: THREE.MeshStandardMaterial): MaterialRole {
  const color = getSourceColor(source);
  const { h, s, l } = color.getHSL({ h: 0, s: 0, l: 0 });

  if (s > 0.34 && h > 0.08 && h < 0.18) return "gold";
  if (l >= 0.84) return "housing";
  if (l >= 0.67) return "accessory";
  if (l >= 0.5) return "hardware";
  return "drive";
}

function createPresentationMaterial(source: THREE.Material): THREE.Material {
  if (!(source instanceof THREE.MeshStandardMaterial)) {
    const fallback = source.clone();
    fallback.side = THREE.DoubleSide;
    return fallback;
  }

  const role = classifyMaterial(source);
  const material = source.clone();

  material.side = THREE.DoubleSide;
  material.transparent = false;
  material.opacity = 1;
  material.emissive.set(0x000000);
  material.emissiveIntensity = 0;

  switch (role) {
    case "gold":
      material.color.set("#d39b16");
      material.metalness = 0.58;
      material.roughness = 0.34;
      material.envMapIntensity = 0.55;
      break;

    case "housing":
      material.color.set("#a9afb3");
      material.metalness = 0.76;
      material.roughness = 0.4;
      material.envMapIntensity = 0.7;
      break;

    case "accessory":
      material.color.set("#666d72");
      material.metalness = 0.72;
      material.roughness = 0.38;
      material.envMapIntensity = 0.62;
      break;

    case "hardware":
      material.color.set("#444a4f");
      material.metalness = 0.68;
      material.roughness = 0.4;
      material.envMapIntensity = 0.56;
      break;

    case "drive":
      material.color.set("#23282c");
      material.metalness = 0.62;
      material.roughness = 0.44;
      material.envMapIntensity = 0.48;
      break;
  }

  material.needsUpdate = true;
  return material;
}

function smoothStep(value: number): number {
  const clamped = THREE.MathUtils.clamp(value, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function buildExplosionParts(importedModel: THREE.Object3D): ExplosionPart[] {
  const namedRoot = importedModel.getObjectByName("Assembly 1");
  const assemblyRoot =
    namedRoot ?? importedModel.children.find((child) => child.children.length >= 20) ?? importedModel.children[0];

  if (!assemblyRoot) return [];

  return EXPLOSION_CONFIG.flatMap((config) => {
    const object = assemblyRoot.children[config.index];
    if (!object) return [];

    return [
      {
        object,
        basePosition: object.position.clone(),
        offset: new THREE.Vector3(...config.offset),
        start: config.start,
        end: config.end,
      },
    ];
  });
}

export function SuperchargerModel({
  src = "/models/supercharger.glb",
  label = "Interactive Roots supercharger assembly",
  className = "",
  autoRotate = true,
  modelScale = 1,
  exploded = false,
}: SuperchargerModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<ViewerRuntime | null>(null);
  const explodedRef = useRef(exploded);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    explodedRef.current = exploded;
    const runtime = runtimeRef.current;
    if (!runtime) return;

    runtime.explodeTarget = exploded ? 1 : 0;
    runtime.cameraGoal.copy(exploded ? EXPLODED_CAMERA : ASSEMBLED_CAMERA);
    runtime.targetGoal.copy(exploded ? EXPLODED_TARGET : ASSEMBLED_TARGET);
    runtime.cameraTransitioning = true;
    runtime.controls.autoRotate = false;
    runtime.controls.enabled = false;
  }, [exploded]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setLoaded(false);
    setFailed(false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
    camera.position.copy(explodedRef.current ? EXPLODED_CAMERA : ASSEMBLED_CAMERA);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.96;
    mount.appendChild(renderer.domElement);

    const hemisphere = new THREE.HemisphereLight(0xffffff, 0x101214, 1.35);
    scene.add(hemisphere);

    const key = new THREE.DirectionalLight(0xffffff, 3.8);
    key.position.set(3.2, 4.1, 5.2);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xc3ccd6, 2.25);
    rim.position.set(-4.1, 1.6, -3.2);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xf1f3f5, 1.15);
    fill.position.set(0.2, -3.8, 2.4);
    scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 1.2;
    controls.maxDistance = 5.2;
    controls.minPolarAngle = Math.PI * 0.23;
    controls.maxPolarAngle = Math.PI * 0.68;
    controls.rotateSpeed = 0.42;
    controls.zoomSpeed = 0.72;
    controls.autoRotate = autoRotate && !explodedRef.current;
    controls.autoRotateSpeed = 0.38;
    controls.target.copy(explodedRef.current ? EXPLODED_TARGET : ASSEMBLED_TARGET);

    let model: THREE.Object3D | null = null;
    let frame = 0;
    let disposed = false;
    const clock = new THREE.Clock();
    const ownedMaterials = new Set<THREE.Material>();

    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        if (disposed) return;

        model = gltf.scene;
        model.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;

          if (Array.isArray(child.material)) {
            child.material = child.material.map((sourceMaterial) => {
              const material = createPresentationMaterial(sourceMaterial);
              ownedMaterials.add(material);
              return material;
            });
          } else {
            const material = createPresentationMaterial(child.material);
            ownedMaterials.add(material);
            child.material = material;
          }

          child.castShadow = false;
          child.receiveShadow = false;
        });

        const importedModel = model;
        const explosionParts = buildExplosionParts(importedModel);
        const rawBounds = new THREE.Box3().setFromObject(importedModel);
        const rawCenter = rawBounds.getCenter(new THREE.Vector3());
        importedModel.position.sub(rawCenter);

        const axisFrame = new THREE.Group();
        axisFrame.name = "supercharger-axis-correction";
        axisFrame.add(importedModel);

        const axisMatrix = new THREE.Matrix4().makeBasis(
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 1, 0),
        );
        axisFrame.quaternion.setFromRotationMatrix(axisMatrix);

        const presentationFrame = new THREE.Group();
        presentationFrame.name = "supercharger-presentation-frame";
        presentationFrame.rotation.y = -0.5;
        presentationFrame.add(axisFrame);

        const orientedBounds = new THREE.Box3().setFromObject(presentationFrame);
        const orientedCenter = orientedBounds.getCenter(new THREE.Vector3());
        presentationFrame.position.sub(orientedCenter);

        const centeredBounds = new THREE.Box3().setFromObject(presentationFrame);
        const size = centeredBounds.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 1.48 * modelScale;
        presentationFrame.scale.setScalar(targetSize / maxDimension);

        const initialProgress = explodedRef.current ? 1 : 0;
        explosionParts.forEach((part) => {
          const localProgress = smoothStep((initialProgress - part.start) / (part.end - part.start));
          part.object.position.copy(part.basePosition).addScaledVector(part.offset, localProgress);
        });

        model = presentationFrame;
        scene.add(model);
        controls.update();
        controls.saveState();

        runtimeRef.current = {
          camera,
          controls,
          parts: explosionParts,
          explodeProgress: initialProgress,
          explodeTarget: initialProgress,
          cameraGoal: (explodedRef.current ? EXPLODED_CAMERA : ASSEMBLED_CAMERA).clone(),
          targetGoal: (explodedRef.current ? EXPLODED_TARGET : ASSEMBLED_TARGET).clone(),
          cameraTransitioning: false,
        };

        setLoaded(true);
      },
      undefined,
      (error) => {
        console.error("Supercharger model failed to load:", src, error);
        if (!disposed) setFailed(true);
      },
    );

    const stopAutoRotate = () => {
      controls.autoRotate = false;
    };

    const resetView = () => {
      const runtime = runtimeRef.current;
      controls.autoRotate = false;
      if (runtime) {
        runtime.cameraGoal.copy(explodedRef.current ? EXPLODED_CAMERA : ASSEMBLED_CAMERA);
        runtime.targetGoal.copy(explodedRef.current ? EXPLODED_TARGET : ASSEMBLED_TARGET);
        runtime.cameraTransitioning = true;
        controls.enabled = false;
      }
    };

    renderer.domElement.addEventListener("pointerdown", stopAutoRotate, { once: true });
    renderer.domElement.addEventListener("dblclick", resetView);

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();
    requestAnimationFrame(resize);

    const animate = () => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const runtime = runtimeRef.current;

      if (runtime) {
        runtime.explodeProgress = THREE.MathUtils.damp(
          runtime.explodeProgress,
          runtime.explodeTarget,
          4.8,
          delta,
        );

        runtime.parts.forEach((part) => {
          const localProgress = smoothStep(
            (runtime.explodeProgress - part.start) / (part.end - part.start),
          );
          part.object.position.copy(part.basePosition).addScaledVector(part.offset, localProgress);
        });

        if (runtime.cameraTransitioning) {
          const cameraAlpha = 1 - Math.exp(-4.8 * delta);
          camera.position.lerp(runtime.cameraGoal, cameraAlpha);
          controls.target.lerp(runtime.targetGoal, cameraAlpha);

          const cameraSettled = camera.position.distanceTo(runtime.cameraGoal) < 0.006;
          const targetSettled = controls.target.distanceTo(runtime.targetGoal) < 0.004;
          const partsSettled = Math.abs(runtime.explodeProgress - runtime.explodeTarget) < 0.003;

          if (cameraSettled && targetSettled && partsSettled) {
            camera.position.copy(runtime.cameraGoal);
            controls.target.copy(runtime.targetGoal);
            runtime.cameraTransitioning = false;
            controls.enabled = true;
            controls.saveState();
          }
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("pointerdown", stopAutoRotate);
      renderer.domElement.removeEventListener("dblclick", resetView);
      ownedMaterials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      runtimeRef.current = null;
      model?.traverse((child) => {
        if (child instanceof THREE.Mesh) child.geometry?.dispose();
      });
    };
  }, [src, autoRotate, modelScale]);

  return (
    <div
      className={`supercharger-model ${className}`}
      ref={mountRef}
      role="img"
      aria-label={label}
    >
      {!loaded && !failed && <span className="supercharger-status">Loading 3D assembly</span>}
      {failed && <span className="supercharger-status">3D assembly unavailable</span>}
      <span className="supercharger-interaction-hint">
        {exploded
          ? "Drag to inspect · Scroll to zoom · Double-click to reset"
          : "Drag to rotate · Scroll to zoom · Double-click to reset"}
      </span>
    </div>
  );
}
