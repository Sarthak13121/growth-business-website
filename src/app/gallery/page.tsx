"use client";

import React, { useState } from "react";
import MediaGallery from "@/components/MediaGallery";
import ActionBanner from "@/components/ActionBanner";
import TiltCard from "@/components/TiltCard";
import { DEALER_CITIES, CERTIFICATIONS } from "@/data/localMockPayload";
import { Settings, CheckCircle2, ShieldCheck, Play, ArrowRight } from "lucide-react";

export default function GalleryPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const highlights = [
    { label: "Factory Area", value: "15,000 Sq Ft", desc: "Phase I GIDC Naroda Floor", icon: Settings },
    { label: "CNC Machinery", value: "12 CNC Units", desc: "Automated lathe cutting", icon: Settings },
    { label: "BIS Licensing", value: "100% Tested", desc: "Zero failure rate guarantee", icon: CheckCircle2 },
    { label: "B2B Shipments", value: "5-Day Dispatch", desc: "Fast logistics delivery", icon: ShieldCheck }
  ];

  const instaMock = [
    { id: 1, img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=250" },
    { id: 2, img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=250" },
    { id: 3, img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=250" },
    { id: 4, img: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=250" },
    { id: 5, img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=250" },
    { id: 6, img: "https://images.unsplash.com/photo-1463123081488-729f6db8045b?auto=format&fit=crop&q=80&w=250" }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Page Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0A1045] to-[#1A237E] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,160,23,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,160,23,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="rounded-full bg-accent/20 border border-accent/30 px-4 py-1 text-xs font-bold text-accent uppercase tracking-wider">
            Visual Proof
          </span>
          <h1 className="font-display text-3xl font-black md:text-5xl leading-tight text-white">
            Factory Floor & Products Gallery
          </h1>
          <p className="mx-auto max-w-2xl font-body text-sm md:text-base text-gray-300">
            A photographic walkthrough of our CNC automation, quality testing labs, team members, and state exhibitions.
          </p>

          {/* 3 Floating Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              🏭 15,000 Sq Ft Production
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              ⚙️ 12 CNC Lathes
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              ✔️ 100% Quality Tested
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Masonry Gallery (Tabs, columns, lightbox) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MediaGallery />
      </section>

      {/* 3. Factory Highlight Strip (4 stats) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 font-body">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.label}
                className="rounded-2xl border border-primary/5 bg-cream/15 p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-primary block sm:text-2xl">
                  {h.value}
                </span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mt-1">
                  {h.label}
                </span>
                <span className="text-[11px] text-foreground/50 block mt-0.5">
                  {h.desc}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. YouTube Video Tour Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Factory Tour
          </span>
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            Watch Our 15,000 Sq Ft Plant in Action
          </h2>
        </div>

        <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-lg border border-primary/5 bg-black">
          {isPlaying ? (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Mehta Agro Industries Factory Tour Video"
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Cover Photo */}
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000"
                alt="Factory tour placeholder"
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
              {/* Play Button Trigger */}
              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-primary-dark shadow-xl hover:scale-110 hover:bg-accent-light active:scale-95 transition-transform"
                aria-label="Play Factory Tour Video"
              >
                <Play className="h-8 w-8 fill-primary-dark ml-1" />
              </button>
              <span className="relative z-10 mt-4 font-body text-xs font-bold text-white uppercase tracking-wider drop-shadow-md">
                Click to Watch Factory Tour
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 5. Certifications & Awards Horizontal scroll gallery (8 cards) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Credentials
          </span>
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            National Awards & Certifications
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin font-body">
          {CERTIFICATIONS.map((cert) => (
            <TiltCard
              key={cert.id}
              className="w-64 shrink-0 rounded-2xl border border-primary/5 bg-cream/15 p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-primary mt-4 leading-snug">
                {cert.title}
              </h3>
              <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider mt-1">
                {cert.authority}
              </p>
              <span className="mt-4 rounded-full bg-cream px-2.5 py-0.5 text-[9px] font-bold text-primary uppercase self-start animate-pulse">
                Reference: {cert.year}
              </span>
            </TiltCard>
          ))}
          {/* Add 2 extra cards for scroll length */}
          <TiltCard className="w-64 shrink-0 rounded-2xl border border-primary/5 bg-cream/15 p-6 shadow-sm flex flex-col justify-between">
            <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-primary mt-4 leading-snug">
              CII National Agri-Awards
            </h3>
            <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider mt-1">
              Confederation of Indian Industry
            </p>
            <span className="mt-4 rounded-full bg-cream px-2.5 py-0.5 text-[9px] font-bold text-primary uppercase self-start animate-pulse">
              Reference: 2024
            </span>
          </TiltCard>
          <TiltCard className="w-64 shrink-0 rounded-2xl border border-primary/5 bg-cream/15 p-6 shadow-sm flex flex-col justify-between">
            <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-primary mt-4 leading-snug">
              MSME Growth Award
            </h3>
            <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider mt-1">
              Gujarat State Ministry
            </p>
            <span className="mt-4 rounded-full bg-cream px-2.5 py-0.5 text-[9px] font-bold text-primary uppercase self-start animate-pulse">
              Reference: 2023
            </span>
          </TiltCard>
        </div>
      </section>

      {/* 6. Dealer Location Marquee (20 cities, infinite scroll, pause on hover) */}
      <section className="w-full bg-[#0A1045] py-10 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase block text-center">
            Network Presence
          </span>
          <h2 className="font-display text-xl font-bold text-white text-center mt-1">
            Active Dealer Networks Across major Agriculture Hubs
          </h2>
        </div>

        {/* Marquee Row */}
        <div className="flex overflow-x-hidden w-full">
          <div className="flex shrink-0 animate-marquee gap-8 whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer py-2 pr-8">
            {DEALER_CITIES.map((city, idx) => (
              <div
                key={`${city}-${idx}`}
                className="rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-body text-xs font-bold text-accent uppercase tracking-wider"
              >
                📍 {city}
              </div>
            ))}
          </div>
          {/* Duplicate for seamless infinite loop */}
          <div className="flex shrink-0 animate-marquee gap-8 whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer py-2 pr-8" aria-hidden="true">
            {DEALER_CITIES.map((city, idx) => (
              <div
                key={`dup-${city}-${idx}`}
                className="rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-body text-xs font-bold text-accent uppercase tracking-wider"
              >
                📍 {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Instagram Feed Placeholder */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Social Feed
          </span>
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            Follow Us On Instagram
          </h2>
          <p className="font-body text-sm text-foreground/50">
            Get daily factory updates, exhibition layouts, and dealer awards posts.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {instaMock.map((insta) => (
            <div key={insta.id} className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream group shadow-sm">
              <img
                src={insta.img}
                alt="Instagram feed post mockup"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-body text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-opacity duration-300">
                View Post &rarr;
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com/mehtaagro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 font-body text-xs font-bold text-white shadow hover:bg-primary-light transition-all"
          >
            Follow @mehtaagro
            <ArrowRight className="h-4.5 w-4.5" />
          </a>
        </div>
      </section>

      {/* 8. CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActionBanner
          title="Want to Visit the Factory in Person?"
          subtitle="We organize guided plant audits for registered dealer syndicates. Schedule a tour with our operations head."
          ctaText="Request Plant Audit"
        />
      </section>
    </div>
  );
}
