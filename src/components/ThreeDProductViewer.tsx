"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Loader2, RotateCcw, Box, Layers3, Play, Pause } from "lucide-react";

export default function ThreeDProductViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interface States
  const [isExploded, setIsExploded] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [activeComponent, setActiveComponent] = useState("Complete Assembly");
  const [currentRpm, setCurrentRpm] = useState(0);

  // Refs for animation targets
  const explosionProgress = useRef(0);
  const fanRotationRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const parent = containerRef.current;

    const width = parent.clientWidth || 400;
    const height = parent.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const goldLight = new THREE.PointLight(0xD4A017, 2, 10);
    goldLight.position.set(-2, 1, 2);
    scene.add(goldLight);

    // Materials
    const navySteelMat = new THREE.MeshStandardMaterial({
      color: 0x1A237E,
      metalness: 0.85,
      roughness: 0.25,
      name: "Stator Body"
    });

    const goldBrassMat = new THREE.MeshStandardMaterial({
      color: 0xD4A017,
      metalness: 0.9,
      roughness: 0.15,
      name: "Impeller Casing"
    });

    const copperCoilMat = new THREE.MeshStandardMaterial({
      color: 0xB87333,
      metalness: 0.7,
      roughness: 0.4,
      name: "Copper Winding"
    });

    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xE0E0E0,
      metalness: 0.9,
      roughness: 0.1,
      name: "Rotor Shaft"
    });

    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x212121,
      metalness: 0.8,
      roughness: 0.3,
      name: "Cooling Shroud"
    });

    // Assemblies & Component Groups
    const pumpGroup = new THREE.Group();
    scene.add(pumpGroup);

    // 1. Shaft (Center axis)
    const shaftGeo = new THREE.CylinderGeometry(0.12, 0.12, 4.4, 16);
    const shaft = new THREE.Mesh(shaftGeo, silverMat);
    shaft.rotation.z = Math.PI / 2;
    pumpGroup.add(shaft);

    // 2. Copper windings (Inside stator, exposed during explode)
    const coilGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.4, 24);
    const coil = new THREE.Mesh(coilGeo, copperCoilMat);
    coil.rotation.z = Math.PI / 2;
    pumpGroup.add(coil);

    // 3. Stator Frame (Motor housing)
    const statorGroup = new THREE.Group();
    const statorGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.6, 24);
    const statorBody = new THREE.Mesh(statorGeo, navySteelMat);
    statorBody.rotation.z = Math.PI / 2;
    statorGroup.add(statorBody);

    // Adding cooling fins
    const finGeo = new THREE.BoxGeometry(0.06, 1.9, 0.1);
    for (let i = 0; i < 12; i++) {
      const fin = new THREE.Mesh(finGeo, darkSteelMat);
      const angle = (i / 12) * Math.PI * 2;
      fin.position.set(Math.cos(angle) * 0.92, 0, Math.sin(angle) * 0.92);
      fin.rotation.y = -angle;
      statorGroup.add(fin);
    }
    pumpGroup.add(statorGroup);

    // 4. Impeller Casing (Chamber)
    const chamberGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.7, 24);
    const chamber = new THREE.Mesh(chamberGeo, goldBrassMat);
    chamber.rotation.z = Math.PI / 2;
    chamber.position.x = -1.4;
    pumpGroup.add(chamber);

    // Suction Inlet (Front)
    const inletGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.6, 16);
    const inlet = new THREE.Mesh(inletGeo, goldBrassMat);
    inlet.rotation.z = Math.PI / 2;
    inlet.position.set(-1.85, 0, 0);
    pumpGroup.add(inlet);

    // Delivery Outlet (Top)
    const outletGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.7, 16);
    const outlet = new THREE.Mesh(outletGeo, goldBrassMat);
    outlet.position.set(-1.4, 0.85, 0);
    pumpGroup.add(outlet);

    // 5. Fan Shroud (Back Cover)
    const fanCoverGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.5, 24);
    const fanCover = new THREE.Mesh(fanCoverGeo, darkSteelMat);
    fanCover.rotation.z = Math.PI / 2;
    fanCover.position.x = 1.35;
    pumpGroup.add(fanCover);

    // 6. Fan Blades (Spinning component)
    const fanGroup = new THREE.Group();
    const fanHubGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16);
    const fanHub = new THREE.Mesh(fanHubGeo, silverMat);
    fanHub.rotation.z = Math.PI / 2;
    fanGroup.add(fanHub);

    const bladeGeo = new THREE.BoxGeometry(0.04, 0.65, 0.12);
    for (let i = 0; i < 6; i++) {
      const blade = new THREE.Mesh(bladeGeo, silverMat);
      blade.rotation.x = 0.2; // pitched blade
      blade.rotation.y = (i / 6) * Math.PI * 2;
      const angle = (i / 6) * Math.PI * 2;
      blade.position.set(0, Math.cos(angle) * 0.35, Math.sin(angle) * 0.35);
      fanGroup.add(blade);
    }
    fanGroup.position.x = 1.45;
    pumpGroup.add(fanGroup);

    // Interactive Drag rotation logic
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

      pumpGroup.rotation.y += deltaX * 0.007;
      pumpGroup.rotation.x += deltaY * 0.007;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      pumpGroup.rotation.y += deltaX * 0.007;
      pumpGroup.rotation.x += deltaY * 0.007;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);

    // Raycasting for component selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pumpGroup.children, true);

      if (intersects.length > 0) {
        let rootObj = intersects[0].object;
        while (rootObj.parent && rootObj.parent !== pumpGroup && rootObj.parent !== scene) {
          rootObj = rootObj.parent;
        }
        
        // Match component names
        if (rootObj === statorGroup) {
          setActiveComponent("Stator Assembly (Heavy Cast Iron)");
        } else if (rootObj === chamber || rootObj === inlet || rootObj === outlet) {
          setActiveComponent("Impeller Chamber & Volute Casing (Brass)");
        } else if (rootObj === coil) {
          setActiveComponent("99.9% Pure Copper Coil Windings");
        } else if (rootObj === fanCover) {
          setActiveComponent("Ventilated Fan Shroud (Protective Shield)");
        } else if (rootObj === fanGroup) {
          setActiveComponent("Dynamically Balanced Air Cooling Fan");
        } else if (rootObj === shaft) {
          setActiveComponent("Tempered Stainless Steel Shaft");
        }
      }
    };
    canvas.addEventListener("click", handleCanvasClick);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // 1. Auto rotation if enabled
      if (isRotating && !isDragging) {
        pumpGroup.rotation.y += 0.005;
        // Keep tilt close to neutral
        pumpGroup.rotation.x = THREE.MathUtils.lerp(pumpGroup.rotation.x, 0.15, 0.05);
      }

      // 2. Explode View Interpolation (Lerp)
      const targetExplode = isExploded ? 1.0 : 0.0;
      explosionProgress.current = THREE.MathUtils.lerp(explosionProgress.current, targetExplode, 0.08);

      const p = explosionProgress.current;

      // Stator (Stays relatively central but expands slightly right)
      statorGroup.position.x = p * 0.3;
      coil.position.x = -p * 0.4; // Expose copper winding outwards to the left

      // Chamber/Volute expands left
      chamber.position.x = -1.4 - p * 1.5;
      inlet.position.x = -1.85 - p * 1.8;
      outlet.position.x = -1.4 - p * 1.5;

      // Cooling shrouds expand right
      fanCover.position.x = 1.35 + p * 1.5;
      fanGroup.position.x = 1.45 + p * 2.2;

      // 3. Spin cooling fan dynamically
      const targetRpmSpeed = isExploded ? 1440 : 2880; // RPM simulation speeds
      if (!isDragging) {
        setCurrentRpm(prev => {
          const diff = targetRpmSpeed - prev;
          return Math.round(prev + diff * 0.05);
        });
      }
      
      const rotationSpeed = (currentRpm / 60) * Math.PI * 2 * delta;
      fanGroup.rotation.y += rotationSpeed;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Default angle tilt
    pumpGroup.rotation.x = 0.15;
    pumpGroup.rotation.y = -0.5;

    animationFrameId = requestAnimationFrame(animate);

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
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      canvas.removeEventListener("click", handleCanvasClick);
      scene.clear();
      renderer.dispose();
    };
  }, [isExploded, isRotating, currentRpm]);

  return (
    <div className="rounded-3xl border border-primary/5 bg-cream/15 p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        
        {/* Left Panel: 3D Canvas */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center bg-[#0A1045] rounded-2xl overflow-hidden shadow-inner h-[320px] md:h-[420px] border border-white/5 group">
          
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
          
          {/* Instructions overlay */}
          <span className="absolute top-4 left-4 z-20 font-body text-[10px] font-bold text-accent uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            🖱️ Drag to Rotate | Click Components
          </span>

          {/* RPM speed meter */}
          <span className="absolute top-4 right-4 z-20 font-body text-[10px] font-bold text-green-400 uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Rotor Speed: {currentRpm} RPM
          </span>

          <div ref={containerRef} className="w-full h-full">
            <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />
          </div>
        </div>

        {/* Right Panel: Technical Specs & Controls */}
        <div className="lg:col-span-5 space-y-6 font-body">
          <div className="space-y-1">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              3D Interactive CAD
            </span>
            <h3 className="font-display text-2xl font-bold text-primary">
              Monoblock Pump Exploded view
            </h3>
            <p className="text-xs text-foreground/50 leading-relaxed">
              Explore the heavy-duty hydraulic architecture of our standard monoblock pump. Toggle controls to audit copper cores and balanced impellers.
            </p>
          </div>

          {/* Active component status display */}
          <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm flex flex-col justify-between min-h-[90px]">
            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">
              Selected Sub-Assembly
            </span>
            <span className="text-sm font-bold text-primary block mt-1">
              {activeComponent}
            </span>
            <span className="text-[11px] text-foreground/60 mt-1 leading-snug">
              {activeComponent === "Complete Assembly"
                ? "Click any mesh component on the 3D model to inspect its technical specifications."
                : activeComponent.includes("Copper")
                ? "Wound with heavy-duty electrolytic grade copper wires. Standard built with class-F insulation layer resisting thermal overloads up to 155°C."
                : activeComponent.includes("Chamber")
                ? "Cast bronze or golden brass housing engineered for optimal volute shape, reducing hydraulic friction and maximizing water head discharge curves."
                : activeComponent.includes("Stator")
                ? "Heavy cast iron frame with thick heat dissipation fins, safeguarding the electromagnetic core and motor windings from dust ingress."
                : activeComponent.includes("Fan")
                ? "A dynamic double-sided high-airflow fan that extracts heat and cools the motor shell during continuous agricultural pumping cycles."
                : "Precision machined tempered steel shaft providing silent alignment and minimizing rotational friction."
              }
            </span>
          </div>

          {/* 3D Dashboard controls */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`rounded-xl border px-4 py-3 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${
                isExploded
                  ? "bg-accent text-primary-dark border-accent hover:bg-accent-light"
                  : "bg-white text-primary border-primary/10 hover:bg-cream/15"
              }`}
            >
              <Layers3 className="h-4 w-4" />
              {isExploded ? "Assemble Model" : "Exploded View"}
            </button>

            <button
              onClick={() => setIsRotating(!isRotating)}
              className="rounded-xl border border-primary/10 bg-white hover:bg-cream/15 px-4 py-3 font-bold text-xs text-primary flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              {isRotating ? <Pause className="h-4 w-4 text-accent fill-accent/25" /> : <Play className="h-4 w-4 text-accent fill-accent/25" />}
              {isRotating ? "Pause Spin" : "Auto Spin"}
            </button>
          </div>

          {/* Reset View Button */}
          <button
            onClick={() => {
              setIsExploded(false);
              setIsRotating(true);
              setActiveComponent("Complete Assembly");
            }}
            className="w-full rounded-xl border border-dashed border-primary/20 bg-cream/5 hover:bg-cream/20 px-4 py-2.5 font-bold text-[11px] text-foreground/60 flex items-center justify-center gap-1.5 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset CAD View
          </button>
        </div>

      </div>
    </div>
  );
}
