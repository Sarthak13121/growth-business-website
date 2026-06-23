"use client";

import React, { useEffect, useState, useRef } from "react";

export default function GlobalEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  // Track mouse coordinates
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  useEffect(() => {
    // 1. Scroll Progress Listener
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Custom Cursor Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Custom Cursor Lag Logic (using requestAnimationFrame for smooth 60fps tracking)
    let animId: number;
    const updateRingPosition = () => {
      const lag = 0.12; // slight lag
      const dx = mouseCoords.current.x - ringCoords.current.x;
      const dy = mouseCoords.current.y - ringCoords.current.y;
      
      ringCoords.current.x += dx * lag;
      ringCoords.current.y += dy * lag;

      if (cursorRingRef.current) {
        const scale = isHovered.current ? "scale(1.7)" : "scale(1)";
        cursorRingRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) ${scale}`;
      }
      animId = requestAnimationFrame(updateRingPosition);
    };
    animId = requestAnimationFrame(updateRingPosition);

    // Cursor Hover Listener (expands circle on buttons/links)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer")
      ) {
        isHovered.current = true;
      } else {
        isHovered.current = false;
      }
    };
    window.addEventListener("mouseover", handleMouseOver);

    // Cursor Click Pulse
    const handleMouseDown = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transition = "transform 0.1s ease-out, border-color 0.1s";
        cursorRingRef.current.style.borderColor = "#D4A017"; // Gold on click
        cursorRingRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) scale(0.6)`;
      }
    };

    const handleMouseUp = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transition = "";
        cursorRingRef.current.style.borderColor = "";
        cursorRingRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) scale(1.6)`;
        setTimeout(() => {
          if (cursorRingRef.current) cursorRingRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) scale(1)`;
        }, 150);
      }
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // 3. Centralized Button Click Ripple Effect
    const handleButtonClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("button, a, .btn") as HTMLElement;
      if (!target) return;

      // Card-specific Tactile Press (0.97 scale-down snap)
      if (target.classList.contains("group") || target.closest(".grid > div")) {
        const card = target.closest(".grid > div") as HTMLElement;
        if (card) {
          card.style.transition = "transform 0.1s ease";
          card.style.transform = "scale(0.97)";
          setTimeout(() => {
            card.style.transform = "";
          }, 100);
        }
      }

      // Generate ripple element
      const ripple = document.createElement("span");
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "scale(0)";
      ripple.style.pointerEvents = "none";
      
      // Determine ripple color (Gold for dark buttons/actions, Royal Blue for light/white buttons)
      const classes = target.className.toLowerCase();
      const isDarkBg = 
        classes.includes("bg-primary") || 
        classes.includes("bg-[#0a1045]") ||
        classes.includes("bg-green") ||
        classes.includes("bg-[#25d366]") ||
        classes.includes("gold-shimmer");
        
      ripple.style.backgroundColor = isDarkBg 
        ? "rgba(212, 160, 23, 0.45)" // Gold
        : "rgba(26, 35, 126, 0.4)";  // Royal Blue

      // Ensure button has relative positioning to contain the absolute ripple
      const originalPosition = target.style.position;
      if (!originalPosition || originalPosition === "static") {
        target.style.position = "relative";
      }
      
      // Prevent overflow
      const originalOverflow = target.style.overflow;
      target.style.overflow = "hidden";

      ripple.className = "animate-ripple-wave";
      target.appendChild(ripple);

      // Clean up ripple element
      setTimeout(() => {
        ripple.remove();
        target.style.position = originalPosition;
        target.style.overflow = originalOverflow;
      }, 600);
    };
    window.addEventListener("click", handleButtonClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("click", handleButtonClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 z-50 h-[3px] bg-accent transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Custom Cursor Circle Lag - Hidden on touch devices */}
      <div 
        ref={cursorRingRef}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-transparent mix-blend-difference transition-transform duration-75 md:block"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        aria-hidden="true"
      />
      
      {/* Custom Cursor Gold Dot */}
      <div 
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        aria-hidden="true"
      />

      {/* Ripple Animation styles */}
      <style jsx global>{`
        @keyframes ripple-wave {
          to {
            transform: scale(3);
            opacity: 0;
          }
        }
        .animate-ripple-wave {
          animation: ripple-wave 0.6s linear forwards;
        }
      `}</style>
    </>
  );
}
