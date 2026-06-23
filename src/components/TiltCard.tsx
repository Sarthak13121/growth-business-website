"use client";

import React, { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x relative to card
    const y = e.clientY - rect.top;  // mouse y relative to card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum rotation angle in degrees
    const maxTilt = 12;

    // Calculate rotation percentage based on mouse position relative to center
    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Apply rotation and subtle scaling
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = "transform 0.05s ease-out, box-shadow 0.05s ease-out";

    // Dynamic offset shadow (moves in opposite direction to tilt)
    const shadowX = -((x - centerX) / centerX) * 12;
    const shadowY = -((y - centerY) / centerY) * 12;
    card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(26, 35, 126, 0.15)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Reset transformations smoothly
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    card.style.boxShadow = "";
  };

  const handleMouseDown = () => {
    const card = cardRef.current;
    if (!card) return;

    // Card click snap down effect
    const transform = card.style.transform;
    card.style.transform = `${transform} scale3d(0.97, 0.97, 0.97)`;
  };

  const handleMouseUp = () => {
    const card = cardRef.current;
    if (!card) return;

    // Card click snap up effect
    const transform = card.style.transform;
    card.style.transform = transform.replace("scale3d(0.97, 0.97, 0.97)", "scale3d(1.02, 1.02, 1.02)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`relative overflow-hidden cursor-pointer select-none ${className}`}
    >
      {children}
    </div>
  );
}
