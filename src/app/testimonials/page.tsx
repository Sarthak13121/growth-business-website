"use client";

import React, { useState } from "react";
import ActionBanner from "@/components/ActionBanner";
import { TESTIMONIALS, STATES_DEALERS, DEALER_CITIES, COMPANY_PROFILE } from "@/data/localMockPayload";
import { StatCounter, RatingProgressBar } from "@/components/MetricsDashboard";
import { MessageSquare, Star, Award, ShieldCheck, Play, ArrowRight, CheckCircle2 } from "lucide-react";
import FlipCard from "@/components/FlipCard";
import TiltCard from "@/components/TiltCard";

const badgeDescriptions: Record<string, string> = {
  "BIS Approved": "Bureau of Indian Standards safety guidelines compliance certification.",
  "ISI Marked": "Standard ISI mark ensuring quality parameters for agricultural pumping.",
  "ISO 9001:2015": "International Quality Management Systems auditing standard.",
  "Govt Export House": "Export House status awarded by DGFT Ministry of Commerce.",
  "MSME Registered": "Micro, Small & Medium Enterprise official registered firm."
};

export default function TestimonialsPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const trustBadges = [
    { label: "BIS Approved", icon: ShieldCheck },
    { label: "ISI Marked", icon: ShieldCheck },
    { label: "ISO 9001:2015", icon: ShieldCheck },
    { label: "Govt Export House", icon: ShieldCheck },
    { label: "MSME Registered", icon: ShieldCheck }
  ];

  const googleReviews = [
    { name: "Ramesh Patel", location: "Mehsana", rating: 5, date: "2 weeks ago", comment: "Outstanding service. The MB-50 monoblock pump runs extremely cool. Immediate subsidy approval." },
    { name: "Suresh Chavan", location: "Nashik", rating: 5, date: "1 month ago", comment: "Drip connectors and disc filters from Mehta are of excellent quality. Zero leakage. Fast shipping." },
    { name: "Amit Yadav", location: "Lucknow", rating: 5, date: "2 months ago", comment: "Great margins and very professional sales support. The Gujarati brochures helped us locally." },
    { name: "Vikas Joshi", location: "Bhopal", rating: 4, date: "3 months ago", comment: "Quality of the crop sprayers is top-grade. The 12V battery backup is reliable. Satisfied dealer." },
    { name: "K. Reddy", location: "Vijayawada", rating: 5, date: "5 months ago", comment: "Indestructible diesel engines. Have been ordering wholesale lots since 2018. Solid MD relationship." }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Page Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0A1045] to-[#1A237E] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,160,23,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,160,23,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="rounded-full bg-accent/20 border border-accent/30 px-4 py-1 text-xs font-bold text-accent uppercase tracking-wider">
            Dealer Trust
          </span>
          <h1 className="font-display text-3xl font-black md:text-5xl leading-tight text-white">
            Dealer & Distributor Testimonials
          </h1>
          <p className="mx-auto max-w-2xl font-body text-sm md:text-base text-gray-300">
            Read stories of business growth from our active network of over 500+ agricultural dealers.
          </p>

          {/* 3 Floating Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              ⭐ 4.8 / 5.0 Google Rating
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              👥 500+ Dealer Network
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              🗺️ 18 States Coverage
            </span>
          </div>
        </div>
      </section>

      {/* 2. Overall Rating Summary Card */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/5 bg-cream/15 p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
            {/* Left Score Box */}
            <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-primary/10 pb-6 md:pb-0 md:pr-6">
              <span className="font-display text-6xl font-black text-primary block leading-none">
                4.8
              </span>
              <div className="flex justify-center text-accent text-xl mt-2 mb-1">
                ★★★★★
              </div>
              <p className="font-body text-xs text-foreground/50 font-bold uppercase tracking-wider">
                Overall Dealer Score
              </p>
              <p className="font-body text-xs text-foreground/45 mt-0.5">
                Based on 500+ audits
              </p>
            </div>

            {/* Right progress bars */}
            <div className="md:col-span-8 space-y-4">
              <RatingProgressBar label="Pump Efficiency & Curves" value={4.9} />
              <RatingProgressBar label="Battery & Shell Build Quality" value={4.8} />
              <RatingProgressBar label="B2B Shipping & Dispatch Speed" value={4.7} />
              <RatingProgressBar label="Technical Documents & Certs" value={4.9} />
              <RatingProgressBar label="Dealer Margin Cooperation" value={4.8} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Testimonials Grid (9 Dealer cards - 3x3) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Authorized Reviews
          </span>
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            Success Stories From Our Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TiltCard
              key={t.id}
              className="rounded-2xl border border-primary/5 bg-cream/10 p-6 flex flex-col justify-between shadow-sm duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-accent text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-body text-[9px] font-bold text-accent uppercase">
                    {t.category || "Dealer Partner"}
                  </span>
                </div>
                <p className="font-body text-sm italic text-foreground/80 leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
              <div className="mt-6 border-t border-primary/5 pt-4">
                <span className="font-display text-sm font-bold text-primary block">{t.name}</span>
                <span className="font-body text-xs text-foreground/50 block mt-0.5">{t.role} — {t.location}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. Video Testimonial Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0A1045] text-white overflow-hidden shadow-xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Video Player */}
            <div className="lg:col-span-5 relative aspect-video lg:aspect-auto bg-black min-h-[300px]">
              {isPlaying ? (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Dealer Video Testimonial"
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
                    alt="Video Testimonial Cover"
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                  />
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary-dark shadow-lg hover:scale-110 transition-transform"
                    aria-label="Play Testimonial Video"
                  >
                    <Play className="h-6 w-6 fill-primary-dark ml-1" />
                  </button>
                  <span className="relative z-10 mt-3 font-body text-[10px] font-bold text-white uppercase tracking-wider">
                    Watch Video Interview
                  </span>
                </div>
              )}
            </div>

            {/* Right: Quote details */}
            <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
                  Distributor Spotlight
                </span>
                <blockquote className="font-display text-lg md:text-xl font-bold leading-relaxed text-white">
                  &ldquo;Over the past 15 years, our partnership with Kantibhai Mehta has helped us service 500+ retail sub-dealers across Maharashtra. Their hydraulic curves are rock-solid.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-gray-300">
                  - Rajesh Chavan, Operations Director at Karanja Farmers Co-Op (Dealer since 2011).
                </p>
              </div>

              {/* 3 mini stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 font-body text-center">
                <div>
                  <span className="text-xl font-bold text-accent block">15+ Yr</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5">Partnership</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-accent block">500+</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5">Sub-Dealers</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-accent block">3500+</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5">Pumps Sold</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Client Dealer Marquees (2 opposite direction rows) */}
      <section className="w-full bg-[#0A1045] py-12 text-white overflow-hidden space-y-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-4">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase block">
            Cooperation Network
          </span>
          <h2 className="font-display text-xl font-bold text-white mt-1">
            Trusted by Reputed B2B Trade Agencies
          </h2>
        </div>

        {/* Row 1: Left scrolling */}
        <div className="flex overflow-x-hidden w-full">
          <div className="flex shrink-0 animate-marquee gap-8 whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer py-1.5 pr-8">
            {DEALER_CITIES.map((city, idx) => (
              <div
                key={`m1-${city}-${idx}`}
                className="rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 font-body text-xs font-bold text-gray-200 uppercase tracking-wider"
              >
                🌾 {city} Agro Traders
              </div>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee gap-8 whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer py-1.5 pr-8" aria-hidden="true">
            {DEALER_CITIES.map((city, idx) => (
              <div
                key={`m1-dup-${city}-${idx}`}
                className="rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 font-body text-xs font-bold text-gray-200 uppercase tracking-wider"
              >
                🌾 {city} Agro Traders
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right scrolling (marquee-reverse) */}
        <div className="flex overflow-x-hidden w-full">
          <div className="flex shrink-0 animate-marquee-reverse gap-8 whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer py-1.5 pr-8">
            {DEALER_CITIES.map((city, idx) => (
              <div
                key={`m2-${city}-${idx}`}
                className="rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 font-body text-xs font-bold text-accent uppercase tracking-wider"
              >
                ⚙️ {city} Pump Agencies
              </div>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee-reverse gap-8 whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer py-1.5 pr-8" aria-hidden="true">
            {DEALER_CITIES.map((city, idx) => (
              <div
                key={`m2-dup-${city}-${idx}`}
                className="rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 font-body text-xs font-bold text-accent uppercase tracking-wider"
              >
                ⚙️ {city} Pump Agencies
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pan-India Network (18 state cards, total 746 active dealers) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Distribution
          </span>
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            Active Regional States Network (746 Active Dealers)
          </h2>
          <p className="font-body text-sm text-foreground/50">
            State-wise representation mapping B2B distribution strength.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 font-body">
          {STATES_DEALERS.map((st) => (
            <TiltCard
              key={st.state}
              className="rounded-2xl border border-primary/5 bg-cream/20 p-5 text-center shadow-sm duration-300"
            >
              <span className="font-display text-lg font-bold text-primary block leading-tight">
                {st.state}
              </span>
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-body text-[10px] font-bold text-accent uppercase mt-2.5 inline-block">
                {st.dealers} dealers
              </span>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 7. Google Reviews Strip (5 Google-style review cards) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Google Reviews
          </span>
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            Verified Customer Reviews
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin font-body">
          {googleReviews.map((rev, idx) => (
            <div
              key={idx}
              className="w-80 shrink-0 rounded-2xl border border-primary/5 bg-cream/15 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {rev.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary leading-tight">{rev.name}</h4>
                    <span className="text-[10px] text-foreground/40">{rev.location} — {rev.date}</span>
                  </div>
                </div>
                <div className="flex text-accent text-sm mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                  ))}
                </div>
                <p className="text-xs text-foreground/75 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div className="mt-4 border-t border-primary/5 pt-3 flex items-center gap-1.5 text-[9px] font-bold text-green-600 uppercase">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Google Business Review
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline hover:text-primary-light"
          >
            See All Reviews on Google Business Profile &rarr;
          </a>
        </div>
      </section>

      {/* 8. Leave a Review CTA (3 buttons) */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/5 bg-cream/15 p-8 text-center space-y-6">
          <div className="space-y-2">
            <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
              Feedback Desk
            </span>
            <h3 className="font-display text-2xl font-bold text-primary">
              Are you an active Mehta Agro Dealer?
            </h3>
            <p className="mx-auto max-w-xl font-body text-sm text-foreground/60 leading-relaxed">
              We highly value your feedback. Rate our dispatch timelines, copper quality, or service response.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 font-body text-xs font-bold">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-3.5 text-white shadow hover:bg-primary-light transition-all active:scale-95"
            >
              ⭐ Write Google Review
            </a>
            <a
              href={`https://wa.me/${COMPANY_PROFILE.phone.replace(/[^0-9]/g, "")}?text=Hello%20Mehta%20Agro%2C%20I%20want%20to%20share%20my%20dealer%20feedback.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-6 py-3.5 text-white shadow hover:bg-[#20ba59] transition-all active:scale-95"
            >
              💬 Send WhatsApp Review
            </a>
            <a
              href="/contact#enquiry-form"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/20 bg-white/20 px-6 py-3.5 text-primary shadow hover:bg-white/35 transition-all active:scale-95"
            >
              📧 Write Corporate Desk
            </a>
          </div>
        </div>
      </section>

      {/* 9. Trust Badges Strip (5 3D Flip cards) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 border-t border-primary/5 pt-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 font-body">
          {trustBadges.map((badge) => (
            <FlipCard
              key={badge.label}
              title={badge.label}
              authority="Official Standard"
              year="Current"
              description={badgeDescriptions[badge.label] || "Certified product standard."}
            />
          ))}
        </div>
      </section>

      {/* 10. Final CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActionBanner
          title="Join 500+ Dealers Who Trust Mehta Agro"
          subtitle="Increase your business turnover. Get certified products eligible for state farming subsidies."
          ctaText="Apply for Dealership"
        />
      </section>
    </div>
  );
}
