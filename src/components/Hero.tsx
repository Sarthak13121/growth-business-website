"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Phone, MessageCircle } from "lucide-react";
import { COMPANY_PROFILE } from "@/data/localMockPayload";
import * as THREE from "three";
import { gsap } from "gsap";

export default function Hero() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Text Split Reveal Animation
  useEffect(() => {
    if (headingRef.current) {
      const heading = headingRef.current;
      const text = heading.textContent || "";
      // Split by words
      const words = text.split(" ");
      heading.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden mr-3 py-1">
              <span class="reveal-word inline-block transform translate-y-full opacity-0 font-display">
                ${word}
              </span>
            </span>`
        )
        .join("");

      gsap.to(heading.querySelectorAll(".reveal-word"), {
        y: "0%",
        opacity: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.2,
      });
    }
  }, [pathname]);

  // Three.js 3D Wireframe Dodecahedron & Starfield Logic
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const width = parent.clientWidth || 500;
    const height = parent.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = isHome ? 8 : 12;

    // Renderer (alpha: true to show CSS background)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD4A017, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 1. Dodecahedron Mesh (Home Page only)
    let dodecahedron: THREE.Mesh | null = null;
    if (isHome) {
      const geometry = new THREE.DodecahedronGeometry(2.2, 1);
      
      // Wireframe Gold Styling
      const material = new THREE.MeshBasicMaterial({
        color: 0xD4A017, // Gold Color
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });

      dodecahedron = new THREE.Mesh(geometry, material);
      scene.add(dodecahedron);

      // Add a small solid inner core
      const innerGeom = new THREE.IcosahedronGeometry(0.6, 0);
      const innerMat = new THREE.MeshPhongMaterial({
        color: 0x1A237E,
        emissive: 0x1A237E,
        shininess: 100,
      });
      const innerCore = new THREE.Mesh(innerGeom, innerMat);
      dodecahedron.add(innerCore);
    }

    // 2. 3D Starfield
    const starsCount = isHome ? 450 : 200;
    const starsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Position stars randomly in a sphere shell
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.random() * 8 + 4; // distance from center

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Star Material (very low opacity tiny particles)
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
    });

    const starfield = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starfield);

    // Animation Loop
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;

      // Rotate starfield slowly
      starfield.rotation.y = elapsedTime * 0.03;
      starfield.rotation.x = elapsedTime * 0.015;

      // Rotate dodecahedron on three axes
      if (dodecahedron) {
        dodecahedron.rotation.x = elapsedTime * 0.15;
        dodecahedron.rotation.y = elapsedTime * 0.22;
        dodecahedron.rotation.z = elapsedTime * 0.08;

        // Breathe effect (subtle scaling)
        const scaleVal = 1 + Math.sin(elapsedTime * 1.5) * 0.05;
        dodecahedron.scale.set(scaleVal, scaleVal, scaleVal);
      }

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
      scene.clear();
      renderer.dispose();
    };
  }, [isHome]);

  const whatsappUrl = `https://wa.me/${COMPANY_PROFILE.phone.replace(/[^0-9]/g, "")}?text=Hello%20Mehta%20Agro%2C%20I%20am%20interested%20in%20your%20products.%20Please%20share%20pricing%20and%20catalogue.`;
  const callUrl = `tel:${COMPANY_PROFILE.phone}`;

  return (
    <section className="relative overflow-hidden bg-[#0A1045] py-20 text-white md:py-28 min-h-[580px] flex items-center">
      
      {/* Parallax Background Container */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none z-0 select-none">
        
        {/* Breathing Aurora Gradient Blobs */}
        <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-accent/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[70%] w-[70%] rounded-full bg-primary-light/20 blur-[130px] animate-pulse-slow" />
        
        {/* Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,160,23,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,160,23,0.035)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
      </div>

      {/* Content Layout Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 px-4 py-1.5 text-xs font-bold tracking-wider text-accent uppercase animate-pulse">
              30+ Years of Manufacturing Leadership
            </span>

            {/* Headline with 3D text shadow styling */}
            <h1 
              ref={headingRef}
              className="text-4xl font-black tracking-tight leading-tight sm:text-6xl text-white py-1"
              style={{
                textShadow: "1px 1px 0px #0A1045, 2px 2px 0px #0A1045, 3px 3px 0px #1A237E, 4px 4px 0px #0A1045, 5px 5px 12px rgba(0, 0, 0, 0.45)"
              }}
            >
              High-Performance Agricultural Equipment Built for Farmers
            </h1>

            <p className="max-w-2xl font-body text-sm md:text-base text-gray-300 leading-relaxed mx-auto lg:mx-0">
              Premium BIS, ISI & ISO 9001:2015 certified monoblock pumps, battery sprayers, drip laterals, and diesel engines. Trusted by 800+ distributors across 18 states.
            </p>

            {/* 3 CTA Buttons */}
            <div className="flex flex-col justify-center lg:justify-start gap-4 sm:flex-row sm:items-center pt-2">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full gold-shimmer-btn px-6 py-3.5 font-body text-sm font-bold text-primary-dark shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <FileText className="h-4.5 w-4.5" />
                Download Catalogue
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3.5 font-body text-sm font-bold text-white hover:bg-white/10 hover:border-white/35 hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="h-4.5 w-4.5 text-[#25D366] fill-[#25D366]/20" />
                WhatsApp Enquiry
              </a>

              <a
                href={callUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3.5 font-body text-sm font-bold text-white hover:bg-white/10 hover:border-white/35 hover:scale-105 active:scale-95 transition-all"
              >
                <Phone className="h-4.5 w-4.5 text-accent" />
                Call Support
              </a>
            </div>
          </div>

          {/* Right Column: Three.js Canvas and floating pills */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] md:min-h-[420px]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none z-10" />
            
            {/* Floating Stat Pills with Z-axis rotation loops */}
            <div className="absolute top-[10%] left-[5%] z-20 animate-float-rotate-left">
              <span className="glass-panel text-white text-xs font-bold px-4 py-2 rounded-full shadow border border-white/10 block whitespace-nowrap">
                ⚡ 15,000 Sq Ft Plant
              </span>
            </div>
            
            <div className="absolute bottom-[15%] right-[5%] z-20 animate-float-rotate-right">
              <span className="glass-panel text-white text-xs font-bold px-4 py-2 rounded-full shadow border border-white/10 block whitespace-nowrap">
                🏆 BIS & ISI Certified
              </span>
            </div>
            
            <div className="absolute top-[65%] left-[20%] z-20 animate-float-rotate-center">
              <span className="glass-panel text-white text-xs font-bold px-4 py-2 rounded-full shadow border border-white/10 block whitespace-nowrap">
                🌍 Export House GJ
              </span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Wave Ripple Bottom Transition SVG */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 select-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
        >
          <path
            d="M0 32L60 42.7C120 53 240 75 360 74.7C480 75 600 53 720 48C840 43 960 53 1080 64C1200 75 1320 85 1380 90.7L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V32Z"
            fill="#FAFAF7"
          />
        </svg>
      </div>

      {/* Floating Pill Bob + Rotation Keyframes */}
      <style jsx global>{`
        @keyframes float-rotate-l {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes float-rotate-r {
          0%, 100% {
            transform: translateY(0px) rotate(2deg);
          }
          50% {
            transform: translateY(-12px) rotate(-2deg);
          }
        }
        @keyframes float-rotate-c {
          0%, 100% {
            transform: translateY(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-8px) rotate(1deg);
          }
        }
        .animate-float-rotate-left {
          animation: float-rotate-l 5s ease-in-out infinite;
        }
        .animate-float-rotate-right {
          animation: float-rotate-r 6s ease-in-out infinite;
        }
        .animate-float-rotate-center {
          animation: float-rotate-c 5.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
