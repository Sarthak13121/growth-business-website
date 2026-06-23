"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface FlipCardProps {
  title: string;
  authority: string;
  year: string;
  description: string;
}

export default function FlipCard({ title, authority, year, description }: FlipCardProps) {
  return (
    <div className="group [perspective:1000px] h-52 w-full cursor-pointer select-none">
      <div className="relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Side */}
        <div className="absolute inset-0 h-full w-full rounded-2xl border border-primary/5 bg-cream/15 p-5 flex flex-col justify-between items-center text-center [backface-visibility:hidden]">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-display text-sm font-bold text-primary leading-snug">
            {title}
          </h3>
          <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">
            {authority}
          </p>
          <span className="rounded-full bg-cream px-2 py-0.5 text-[9px] font-bold text-primary uppercase">
            Ref: {year}
          </span>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#0A1045] text-white p-5 flex flex-col justify-between items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] border border-accent/20">
          <div className="flex-grow flex items-center justify-center">
            <p className="font-body text-xs text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
          <span className="rounded-full bg-accent/25 border border-accent/40 px-2.5 py-0.5 text-[9px] font-bold text-accent uppercase mt-2">
            Verified Standard
          </span>
        </div>

      </div>
    </div>
  );
}
