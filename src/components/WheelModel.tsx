"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type WheelModelProps = {
  src: string;
  label: string;
  className?: string;
  autoRotate?: boolean;
  modelScale?: number;
};

export function WheelModel({
  src,
  label,
  className = "",
  autoRotate = true,
  modelScale = 1,
}: WheelModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setLoaded(false);
    setFailed(false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
    camera.position.set(0, 0.02, 1.72);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xffffff, 0x0d0d0d, 1.45);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 4.2);
    key.position.set(2.4, 3.5, 4.5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xbfc6d2, 2.5);
    rim.position.set(-3.5, 1.4, -2.4);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xffffff, 1.6);
    fill.position.set(0, -3.5, 2);
    scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 1.02;
    controls.maxDistance = 3.1;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.72;

    let model: THREE.Object3D | null = null;
    let frame = 0;
    let disposed = false;

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c8c8c3"),
      metalness: 0.78,
      roughness: 0.38,
    });

    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.rotation.x = Math.PI / 2;
        model.rotation.z = -0.08;

        const rotatedBox = new THREE.Box3().setFromObject(model);
        const size = rotatedBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetDiameter = 1.03 * modelScale;
        model.scale.setScalar(targetDiameter / maxDimension);

        scene.add(model);
        controls.target.set(0, 0, 0);
        controls.update();
        setLoaded(true);
      },
      undefined,
      () => {
        if (!disposed) setFailed(true);
      },
    );

    const stopAutoRotate = () => {
      controls.autoRotate = false;
    };
    renderer.domElement.addEventListener("pointerdown", stopAutoRotate, { once: true });

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

    const animate = () => {
      frame = requestAnimationFrame(animate);
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
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      model?.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
        }
      });
    };
  }, [src, autoRotate, modelScale]);

  return (
    <div className={`wheel-model ${className}`} ref={mountRef} role="img" aria-label={label}>
      {!loaded && !failed && <span className="model-status">Loading 3D geometry</span>}
      {failed && <span className="model-status">3D model unavailable</span>}
      <span className="model-interaction-hint">Drag to rotate · Scroll to zoom</span>
    </div>
  );
}
