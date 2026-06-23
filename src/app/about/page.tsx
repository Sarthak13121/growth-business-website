"use client";

import React from "react";
import Timeline from "@/components/Timeline";
import ThreeDGlobe from "@/components/ThreeDGlobe";
import ActionBanner from "@/components/ActionBanner";
import { TEAM_MEMBERS, CERTIFICATIONS, COMPANY_PROFILE } from "@/data/localMockPayload";
import { StatCounter } from "@/components/MetricsDashboard";
import { ShieldCheck, Award, Star, Settings, Package, Layers } from "lucide-react";
import FlipCard from "@/components/FlipCard";

const certDescriptions: Record<string, string> = {
  "BIS Certification": "Ensures products comply with the Bureau of Indian Standards' safety and performance specifications.",
  "ISI Mark License": "Guarantees agricultural equipment conforms to standard quality control guidelines defined by the government.",
  "ISO 9001:2015": "Certified Quality Management Systems monitoring raw materials and final pump tolerances.",
  "MSME Registration": "Registered Micro, Small & Medium Enterprise with the Government of India supporting B2B credit programs.",
  "Export House Certificate": "Granted by the Ministry of Commerce for outstanding record of global shipments and operations.",
  "CII National Award": "Awarded by the Confederation of Indian Industry for manufacturing innovation and green engineering standards."
};

export default function AboutPage() {
  const infraCards = [
    { title: "CNC Machine Floor", desc: "Equipped with 12 advanced lathe machines for exact component matching.", icon: Settings },
    { title: "Winding & Assembly", desc: "Automated copper winding lines with dual thermal varnish curing stations.", icon: Layers },
    { title: "Hydraulic Testing Lab", desc: "Dual performance test benches to measure head, pressure, and discharge.", icon: Award },
    { title: "Raw Material Storage", desc: "15,000 sq ft warehouse storing clean graded bronze and cast iron.", icon: Package },
    { title: "Export Packaging Bay", desc: "Wooden crate sizing machinery built to maritime transport guidelines.", icon: ShieldCheck },
    { title: "Testing Staff", desc: "Bureau of Indian Standards trained laboratory testing engineers.", icon: Star }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Page Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0A1045] to-[#1A237E] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,160,23,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,160,23,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="rounded-full bg-accent/20 border border-accent/30 px-4 py-1 text-xs font-bold text-accent uppercase tracking-wider">
            Established 1994
          </span>
          <h1 className="font-display text-3xl font-black md:text-5xl leading-tight text-white">
            Manufacturing Trust & Quality
          </h1>
          <p className="mx-auto max-w-2xl font-body text-sm md:text-base text-gray-300">
            Learn about Mehta Agro Industries' 30-year legacy of engineering reliable agricultural solutions.
          </p>

          {/* 3 Floating Stat Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              ⚡ 15,000 Sq Ft Facility
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              👥 140 Working Employees
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              📜 ISO 9001:2015 Audited
            </span>
          </div>
        </div>
      </section>

      {/* 2. Story + Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
              Our Journey
            </span>
            <h2 className="font-display text-3xl font-bold text-primary leading-tight">
              30 Years of Agricultural Engineering
            </h2>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">
              Mehta Agro Industries began with a single vision: to build agricultural equipment that stands the test of time. Under the guidance of Kantibhai Mehta, we transitioned from basic diesel motors into complex B2B irrigation systems, earning a reputation for reliability.
            </p>
            <div className="rounded-xl border border-primary/5 bg-cream/30 p-5">
              <span className="font-display text-xs font-bold text-primary uppercase block">
                Quality Statement
              </span>
              <p className="font-body text-xs text-foreground/75 italic mt-1 leading-relaxed">
                &ldquo;We don't just sell pumps; we build the channels that nurture crops and secure the livelihoods of thousands of farmers globally.&rdquo;
              </p>
            </div>
          </div>

          {/* Right vertical gold timeline */}
          <div className="lg:col-span-7 pl-4 lg:pl-10">
            <Timeline />
          </div>
        </div>
      </section>

      {/* 3. Founder Introduction */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/5 bg-cream/15 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            {/* Left Photo Wrapper */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative h-60 w-60 rounded-2xl overflow-hidden bg-cream border-2 border-accent shadow-md">
                <img
                  src={TEAM_MEMBERS[0].image}
                  alt={TEAM_MEMBERS[0].name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Right Bio & Quote */}
            <div className="lg:col-span-8 space-y-4">
              <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
                Founder Message
              </span>
              <h3 className="font-display text-2xl font-bold text-primary">
                Kantibhai Mehta
              </h3>
              <p className="font-body text-xs text-foreground/50 uppercase tracking-widest -mt-2 font-semibold">
                Founder & Managing Director
              </p>
              <p className="font-body text-base italic text-foreground/90 leading-relaxed">
                &ldquo;Starting this workshop in 1994, our primary goal was simple: zero defects. Thirty years later, that engineering ethos still defines every impeller we balance and every lateral pipe we extrude at our Naroda GIDC facility.&rdquo;
              </p>
              <p className="font-body text-sm text-foreground/70 leading-relaxed">
                {TEAM_MEMBERS[0].bio} Mehta Agro has evolved from serving local farmers in Ahmedabad into an ISO certified manufacturer exporting to East Africa and South Asia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="glass-panel rounded-2xl p-8 space-y-4 border border-white/10 shadow-lg">
              <h3 className="font-display text-2xl font-bold text-accent">Our Mission</h3>
              <p className="font-body text-sm text-gray-300 leading-relaxed">
                To engineer energy-efficient, government-certified agricultural equipment that maximizes crop yields, reduces operating costs, and builds long-term profitability for our distributor network.
              </p>
            </div>
            {/* Vision */}
            <div className="glass-panel rounded-2xl p-8 space-y-4 border border-white/10 shadow-lg">
              <h3 className="font-display text-2xl font-bold text-accent">Our Vision</h3>
              <p className="font-body text-sm text-gray-300 leading-relaxed">
                To become the premier B2B manufacturer of irrigation and crop sprayers globally, extending our distributor network to 2,000+ dealers and launching hybrid dual-fuel pump sets across developing markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Global Export Operations (Three.js 3D Globe) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
              Global Operations
            </span>
            <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl leading-tight">
              Registered Export House Reaching 6 Countries
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed">
              Awarded Export House status by the DGFT Ministry of Commerce, Mehta Agro Industries supplies custom container lots of irrigation pumps and battery sprayers to regional B2B dealer syndicates in Kenya, Tanzania, Sri Lanka, Nepal, and Bangladesh.
            </p>
            <p className="font-body text-sm text-foreground/75 leading-relaxed">
              All export orders are double-boxed, packaged with English/Swahili technical user guidelines, and shipped directly from the Nhava Sheva dock within 12 working days of credit approval.
            </p>
          </div>
          <div className="lg:col-span-5 h-[340px] flex items-center justify-center bg-[#0A1045]/5 rounded-3xl border border-primary/5 p-6 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,35,126,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,35,126,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
            <ThreeDGlobe />
          </div>
        </div>
      </section>

      {/* 5. Achievement Numbers Strip (6 stats) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-primary rounded-2xl p-6 text-white grid grid-cols-2 gap-4 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <StatCounter endValue={30} label="Years legacy" suffix="yr" />
        <StatCounter endValue={140} label="Team size" suffix="" />
        <StatCounter endValue={120} label="Products range" suffix="+" />
        <StatCounter endValue={800} label="Distributors" suffix="+" />
        <StatCounter endValue={18} label="States served" suffix="" />
        <StatCounter endValue={6} label="Export nations" suffix="" />
      </section>

      {/* 6. Certifications & Awards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Accreditation
          </span>
          <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Certifications & Industry Awards
          </h2>
          <p className="mx-auto max-w-xl font-body text-sm text-foreground/60">
            Compliance and high manufacturing standards verified by leading institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 font-body">
          {CERTIFICATIONS.map((cert) => (
            <FlipCard
              key={cert.id}
              title={cert.title}
              authority={cert.authority}
              year={cert.year}
              description={certDescriptions[cert.title] || "Official quality verification document."}
            />
          ))}
        </div>
      </section>

      {/* 7. Leadership Team */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Management
          </span>
          <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Leadership Team
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 font-body">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-primary/5 bg-cream/10 p-6 flex flex-col items-center text-center shadow-sm"
            >
              <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-accent bg-cream shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mt-4">
                {member.name}
              </h3>
              <span className="text-xs font-bold text-accent uppercase tracking-wider mt-0.5">
                {member.role}
              </span>
              <p className="text-xs text-foreground/70 mt-3 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Factory Photo Strip (6 Infrastructure cards) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Infrastructure
          </span>
          <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Factory Setup & Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 font-body">
          {infraCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-primary/5 bg-cream/20 p-6 flex items-start gap-4 shadow-sm"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-sm font-bold text-primary">
                    {card.title}
                  </h3>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActionBanner
          title="Come See the Factory Yourself"
          subtitle="We welcome agricultural distributors and wholesalers to audit our 15,000 sq ft facilities in Naroda GIDC, Ahmedabad, Gujarat."
          ctaText="Schedule Factory Visit"
        />
      </section>
    </div>
  );
}
