"use client";

import React, { useEffect, useState, useRef } from "react";

export function StatCounter({
  endValue,
  label,
  suffix = "+",
  duration = 1500,
}: {
  endValue: number;
  label: string;
  suffix?: string;
  duration?: number;
}) {
  const [digits, setDigits] = useState<number[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const str = endValue.toString();

  useEffect(() => {
    // Initialize digits to 0
    setDigits(Array.from({ length: str.length }).map(() => 0));

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          // Stagger digit roll offsets
          const targetDigits = str.split("").map(Number);
          targetDigits.forEach((digit, idx) => {
            setTimeout(() => {
              setDigits((prev) => {
                const next = [...prev];
                next[idx] = digit;
                return next;
              });
            }, idx * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, str]);

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="flex items-center justify-center font-display text-4xl font-extrabold text-accent text-shadow-gold sm:text-5xl">
        {digits.map((digit, idx) => (
          <div key={idx} className="relative h-12 overflow-hidden w-[0.62em] inline-block text-center">
            <div 
              className="flex flex-col transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateY(-${digit * 10}%)` }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n} className="h-12 leading-none flex items-center justify-center">
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
        <span className="leading-none flex items-center">{suffix}</span>
      </div>
      <span className="mt-2 font-body text-sm font-semibold tracking-wider text-gray-200 uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
}

// Progress Bar helper component
export function RatingProgressBar({
  label,
  value,
  max = 5,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const percentage = (value / max) * 100;
          setWidth(percentage);
        }
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [value, max]);

  return (
    <div ref={barRef} className="space-y-1.5 w-full">
      <div className="flex justify-between text-sm font-body font-semibold">
        <span className="text-foreground/80">{label}</span>
        <span className="text-primary font-bold">{value} / {max}</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-cream overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function MetricsDashboard() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 bg-primary rounded-2xl shadow-xl divide-y sm:divide-y-0 sm:divide-x divide-white/10 p-4">
      <StatCounter endValue={30} label="Years of Excellence" suffix="+" />
      <StatCounter endValue={120} label="Certified Products" suffix="+" />
      <StatCounter endValue={800} label="Active Distributors" suffix="+" />
      <StatCounter endValue={18} label="States Served" suffix="+" />
    </div>
  );
}
