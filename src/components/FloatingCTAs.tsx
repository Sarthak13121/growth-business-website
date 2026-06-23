"use client";

import React, { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { COMPANY_PROFILE } from "@/data/localMockPayload";

interface BurstParticle {
  id: number;
  dx: number;
  dy: number;
}

export default function FloatingCTAs() {
  const whatsappUrl = `https://wa.me/${COMPANY_PROFILE.phone.replace(/[^0-9]/g, "")}?text=Hello%20Mehta%20Agro%2C%20I%20am%20interested%20in%20your%20products.%20Please%20share%20pricing%20and%20catalogue.`;
  const callUrl = `tel:${COMPANY_PROFILE.phone}`;

  const [bouncing, setBouncing] = useState(false);
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  const handleWhatsAppClick = () => {
    // 1. WhatsApp Button Spring Bounce
    setBouncing(true);
    setTimeout(() => setBouncing(false), 300);

    // 2. WhatsApp Particle Burst (8 green dots flying outwards)
    const generated: BurstParticle[] = Array.from({ length: 8 }).map((_, idx) => {
      const angle = (idx * 45 * Math.PI) / 180;
      const distance = Math.random() * 30 + 50; // distance in px
      return {
        id: Math.random(),
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
      };
    });
    setParticles(generated);
    setTimeout(() => setParticles([]), 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 ${
          bouncing ? "scale-125 rotate-6 duration-100 ease-out" : "hover:scale-110 active:scale-95 duration-300"
        }`}
        aria-label="Contact Mehta Agro via WhatsApp"
        title="WhatsApp Chat"
      >
        <MessageCircle className="h-7 w-7 fill-white z-10" />

        {/* Particles rendering */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute h-2.5 w-2.5 rounded-full bg-[#25D366] border border-white/30 animate-particle-fade pointer-events-none"
            style={{
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
            } as React.CSSProperties}
          />
        ))}
      </a>

      {/* Call Button */}
      <a
        href={callUrl}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Call Mehta Agro Support"
        title="Call Support"
      >
        <Phone className="h-6 w-6 fill-white" />
      </a>

      <style jsx global>{`
        @keyframes particle-fade {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--dx), var(--dy), 0) scale(0.3);
            opacity: 0;
          }
        }
        .animate-particle-fade {
          animation: particle-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
