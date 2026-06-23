"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Settings, CheckCircle2, ShieldCheck, Users, HelpCircle, Package } from "lucide-react";
import Hero from "@/components/Hero";
import MetricsDashboard, { StatCounter } from "@/components/MetricsDashboard";
import { TESTIMONIALS, PRODUCTS } from "@/data/localMockPayload";
import ActionBanner from "@/components/ActionBanner";
import TiltCard from "@/components/TiltCard";

export default function HomePage() {
  // Get 3 representative testimonials
  const featuredTestimonials = TESTIMONIALS.slice(0, 3);
  
  // Get 6 unique product categories to display in the overview grid
  const categoryCards = [
    { title: "Irrigation Pumps", desc: "Monoblock, submersible, and centrifugal pumps (0.5HP to 15HP)", icon: Settings, count: "28 Products" },
    { title: "Crop Sprayers", desc: "Manual, battery-powered, and tractor-mounted sprayers (up to 500L)", icon: Package, count: "22 Products" },
    { title: "Drip System Components", desc: "Laterals, disc filters, emitters, and connectors", icon: CheckCircle2, count: "31 Products" },
    { title: "Diesel Engine Sets", desc: "Water-cooled engines (3.5HP to 10HP) & dual-fuel models", icon: Settings, count: "14 Products" },
    { title: "Spare Parts & Consumables", desc: "Bronze impellers, ceramic seals, and nozzles", icon: ShieldCheck, count: "19 Products" },
    { title: "Wholesale & Export", desc: "Custom B2B packaging and OEM branding solutions", icon: Users, count: "6 Products" }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Navbar & Hero Section */}
      <Hero />

      {/* 2. Stats Strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <MetricsDashboard />
      </div>

      {/* 3. Quick Intro & Why Dealers Choose Us */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
              Who We Are
            </span>
            <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl leading-tight">
              Trusted Partner for Agricultural Dealerships Since 1994
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed">
              Founded by Kantibhai Mehta in Naroda GIDC, Ahmedabad, Gujarat, Mehta Agro Industries has grown from a local machinery workshop into a 15,000 sq ft manufacturing house. We combine advanced CNC automated precision with strict ISI guidelines to build high-discharge water pumps, long-range sprayers, and robust drip lines.
            </p>
            <p className="font-body text-sm text-foreground/75 leading-relaxed">
              Our B2B support model includes attractive dealer margins, immediate spare parts dispatch, and digital certification paperwork to guarantee government subsidy approvals.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-body text-sm font-bold text-primary hover:text-primary-light hover:underline"
              >
                Learn More About Our Factory
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-accent/20 bg-cream/35 p-8 shadow-sm space-y-6">
            <h3 className="font-display text-lg font-bold text-primary">
              Why Dealers Choose Mehta Agro
            </h3>
            
            <ul className="space-y-4 font-body text-sm">
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">Government Subsidies</span>
                  ISI & BIS registrations allow farmers to claim standard state subsidies.
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">100% Copper Windings</span>
                  All pumps use premium heavy-gauge copper for thermal overload protection.
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">Quick Dispatch System</span>
                  90% of standard bulk orders leave our Naroda facility within 5 working days.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Products Overview (3x2 Grid) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Our Offerings
          </span>
          <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Agricultural Product Categories
          </h2>
          <p className="mx-auto max-w-2xl font-body text-sm text-foreground/60">
            Over 120+ specialized B2B products custom-engineered for maximum durability in harsh environments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map((card) => {
            const Icon = card.icon;
            return (
              <TiltCard 
                key={card.title}
                className="rounded-2xl border border-primary/5 bg-cream/15 transition-all duration-300 group"
              >
                <Link
                  href={`/products?category=${encodeURIComponent(card.title)}`}
                  className="flex flex-col p-6 h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-body text-[10px] font-bold text-accent uppercase">
                      {card.count}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary group-hover:text-primary-light transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-foreground/75 leading-relaxed flex-grow">
                    {card.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:text-accent-dark transition-colors">
                    View Catalog
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* 5. Why Choose Us (Royal Blue Section) */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-16">
            <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
              B2B Advantage
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Engineered for Ultimate Reliability
            </h2>
            <p className="mx-auto max-w-2xl font-body text-sm text-gray-300">
              How we guarantee high operational standards for wholesale dealers and distributors.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <span className="absolute top-4 right-4 font-display text-6xl font-black text-white/5 group-hover:text-accent/10 transition-colors">
                01
              </span>
              <h3 className="font-display text-lg font-bold text-accent mb-2">CNC Precision</h3>
              <p className="font-body text-xs text-gray-300 leading-relaxed">
                Automated CNC machining guarantees consistent tolerance ratings on pump impellers and seals.
              </p>
            </div>
            {/* Card 2 */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <span className="absolute top-4 right-4 font-display text-6xl font-black text-white/5 group-hover:text-accent/10 transition-colors">
                02
              </span>
              <h3 className="font-display text-lg font-bold text-accent mb-2">100% Tested</h3>
              <p className="font-body text-xs text-gray-300 leading-relaxed">
                Every submersible pump undergoes pressure testing at our hydraulic bay before packaging.
              </p>
            </div>
            {/* Card 3 */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <span className="absolute top-4 right-4 font-display text-6xl font-black text-white/5 group-hover:text-accent/10 transition-colors">
                03
              </span>
              <h3 className="font-display text-lg font-bold text-accent mb-2">Dealer Support</h3>
              <p className="font-body text-xs text-gray-300 leading-relaxed">
                Free marketing brochures, product flyers, and local demonstration camps to boost dealer turnover.
              </p>
            </div>
            {/* Card 4 */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <span className="absolute top-4 right-4 font-display text-6xl font-black text-white/5 group-hover:text-accent/10 transition-colors">
                04
              </span>
              <h3 className="font-display text-lg font-bold text-accent mb-2">Global Exports</h3>
              <p className="font-body text-xs text-gray-300 leading-relaxed">
                Certified Export House logistics handling container shipments directly to East Africa and South Asia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Dealer Trust
          </span>
          <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
            What Our Distributor Partners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {featuredTestimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-primary/5 bg-cream/10 p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex text-accent mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="font-body text-sm italic text-foreground/80 leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
              <div className="mt-6 border-t border-primary/5 pt-4">
                <span className="font-display text-sm font-bold text-primary block">{t.name}</span>
                <span className="font-body text-xs text-foreground/50 block mt-0.5">{t.role} — {t.location}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-1.5 font-body text-sm font-bold text-primary hover:text-accent transition-colors hover:underline"
          >
            Read All 500+ Dealer Stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 7. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActionBanner />
      </section>
    </div>
  );
}
