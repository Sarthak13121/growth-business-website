"use client";

import React from "react";
import { TIMELINE_MILESTONES } from "@/data/localMockPayload";

export default function Timeline() {
  return (
    <div className="relative border-l-2 border-accent/40 pl-6 ml-4 space-y-12">
      {TIMELINE_MILESTONES.map((milestone) => (
        <div key={milestone.year} className="relative group">
          {/* Milestone Circle Pin */}
          <span className="absolute -left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-primary-dark ring-4 ring-warm-ivory group-hover:scale-125 transition-transform">
            {milestone.year.toString().slice(2)}
          </span>

          {/* Card Box */}
          <div className="rounded-xl border border-primary/5 bg-cream/30 p-6 shadow-sm hover:shadow-md hover:border-primary/10 transition-all">
            <span className="font-display text-lg font-bold text-accent">
              {milestone.year}
            </span>
            <h4 className="font-body text-base font-bold text-primary mt-1">
              {milestone.title}
            </h4>
            <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
              {milestone.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
