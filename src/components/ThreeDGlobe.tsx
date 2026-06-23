"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const parent = containerRef.current;

    const width = parent.clientWidth || 300;
    const height = parent.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 6.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xD4A017, 1.5);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Wireframe Earth Globe
    const globeRadius = 1.8;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 22, 22);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0xD4A017, // Gold accent
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    // 2. Solid Inner core (Glowing dark navy)
    const coreGeometry = new THREE.SphereGeometry(globeRadius * 0.96, 24, 24);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x0A1045,
      emissive: 0x0A1045,
      shininess: 30,
      transparent: true,
      opacity: 0.8,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(core);

    // Coordinates conversion function (Latitude/Longitude to Cartesian 3D)
    const convertCoordinates = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.sin(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);

      return new THREE.Vector3(x, y, z);
    };

    // Pins data (India, East Africa, Nepal, Sri Lanka, Bangladesh)
    const exportTargets = [
      { name: "India (Gujarat HQ)", lat: 22.3, lon: 70.8 },
      { name: "Kenya (Nairobi)", lat: -1.29, lon: 36.82 },
      { name: "Tanzania (Dar es Salaam)", lat: -6.79, lon: 39.27 },
      { name: "Nepal (Kathmandu)", lat: 27.71, lon: 85.32 },
      { name: "Sri Lanka (Colombo)", lat: 6.92, lon: 79.86 },
      { name: "Bangladesh (Dhaka)", lat: 23.81, lon: 90.41 },
    ];

    const pinGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // white hot core
    const pulseRingGeometry = new THREE.RingGeometry(0.01, 0.12, 16);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0xD4A017,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });

    const pulses: THREE.Mesh[] = [];

    exportTargets.forEach((target) => {
      const pos = convertCoordinates(target.lat, target.lon, globeRadius);

      // Sphere Pin
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      pin.position.copy(pos);
      globeGroup.add(pin);

      // Pulsing Ring on surface
      const ring = new THREE.Mesh(pulseRingGeometry, pulseRingMat.clone());
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0); // Orient flat to sphere surface
      globeGroup.add(ring);
      pulses.push(ring);
    });

    // Orbit Rotations controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const startTime = Date.now();
    let ringScale = 1;

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;

      // Rotate Globe slowly
      if (!isDragging) {
        globeGroup.rotation.y = elapsedTime * 0.08;
        globeGroup.rotation.x = 0.25; // fixed polar tilt
      }

      // Animate pulsing rings
      ringScale = 1 + (elapsedTime * 2.5) % 1.5;
      const opacity = Math.max(0, 1 - (ringScale - 1) / 1.5);

      pulses.forEach((ring) => {
        ring.scale.set(ringScale, ringScale, 1);
        if (Array.isArray(ring.material)) {
          // multiple mats
        } else {
          ring.material.opacity = opacity;
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
      {/* Visual background rings */}
      <div className="absolute h-64 w-64 rounded-full border border-accent/10 animate-ping pointer-events-none opacity-20" />
      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing w-full h-full max-w-[320px] max-h-[320px] z-10" />
    </div>
  );
}
