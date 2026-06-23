"use client";

import React, { useState, Suspense } from "react";
import ProductCatalog from "@/components/ProductCatalog";
import ThreeDProductViewer from "@/components/ThreeDProductViewer";
import ActionBanner from "@/components/ActionBanner";
import { TESTIMONIALS, COMPANY_PROFILE } from "@/data/localMockPayload";
import { CheckCircle2, ShieldCheck, Mail, Phone, MessageSquare } from "lucide-react";

export default function ProductsPage() {
  // Get 3 testimonials relating to product quality
  const productTestimonials = TESTIMONIALS.filter(t => t.id === "t1" || t.id === "t2" || t.id === "t4");

  // Local state for B2B Mini Form
  const [b2bData, setB2bData] = useState({
    name: "",
    phone: "",
    stateCity: "",
    category: "Irrigation Pumps",
    quantity: "10-50 units",
    message: ""
  });
  const [b2bStatus, setB2bStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!b2bData.name || !b2bData.phone || !b2bData.stateCity) {
      alert("Please fill in the required fields (*)");
      return;
    }
    setB2bStatus("submitting");
    await new Promise(resolve => setTimeout(resolve, 1200));
    setB2bStatus("success");
    setB2bData({
      name: "",
      phone: "",
      stateCity: "",
      category: "Irrigation Pumps",
      quantity: "10-50 units",
      message: ""
    });
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Page Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0A1045] to-[#1A237E] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,160,23,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,160,23,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="rounded-full bg-accent/20 border border-accent/30 px-4 py-1 text-xs font-bold text-accent uppercase tracking-wider">
            Agricultural Catalog
          </span>
          <h1 className="font-display text-3xl font-black md:text-5xl leading-tight text-white">
            High-Performance Product Range
          </h1>
          <p className="mx-auto max-w-2xl font-body text-sm md:text-base text-gray-300">
            Browse our certified agricultural solutions, download catalog sheets, and order directly via WhatsApp.
          </p>

          {/* 3 Floating Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              📦 120+ Products Catalog
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              🚜 6 Major Categories
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200">
              🤝 Bulk Orders Welcome
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Product Catalog (Filters, Grid, Specs, PDF downloads) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <ProductCatalog />
        </Suspense>
      </section>

      {/* 2.5. 3D Interactive Product Visualizer (Exploded CAD view) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            3D CAD View
          </span>
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            Interactive 3D Pump Visualizer
          </h2>
        </div>
        <ThreeDProductViewer />
      </section>

      {/* 3. Bulk Order & Wholesale B2B Enquiry Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0A1045] text-white p-8 md:p-12 shadow-xl border-l-4 border-accent">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            {/* Column 1: B2B Advantages */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
                Wholesale Portal
              </span>
              <h2 className="font-display text-2xl font-bold md:text-3xl leading-tight text-white">
                Bulk Wholesale & OEM Solutions
              </h2>
              <p className="font-body text-sm text-gray-300 leading-relaxed">
                Mehta Agro Industries provides robust manufacturing infrastructure for large scale distributors, government tenders, and custom B2B branding requests.
              </p>
              
              <ul className="space-y-4 font-body text-xs text-gray-200">
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">OEM Branding (MOQ 50 Units)</span>
                    We manufacture pump systems and sprayers labeled under your registered brand names.
                  </div>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Custom Pump Impeller Grinds</span>
                    Our engineering floor custom machines bronze impellers to match specific discharge curves.
                  </div>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Subsidized Dealer Support</span>
                    Full registration support, ISI certificate scans, and MSME invoices for smooth billing.
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 2: Mini Form */}
            <div className="lg:col-span-6 rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
              <h3 className="font-display text-lg font-bold text-accent mb-4">
                Quick B2B Wholesale Request
              </h3>
              
              {b2bStatus === "success" ? (
                <div className="rounded-xl bg-white/10 p-6 text-center text-accent space-y-2 border border-accent/20">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
                  <h4 className="font-display text-base font-bold">Wholesale Enquiry Logged!</h4>
                  <p className="font-body text-xs text-gray-300">
                    Our corporate sales representative will review your request and share standard pricing catalogues within 4 hours.
                  </p>
                  <button
                    onClick={() => setB2bStatus("idle")}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-primary-dark shadow hover:bg-accent-light transition-colors"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleB2bSubmit} className="space-y-4 font-body text-xs text-white">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={b2bData.name}
                        onChange={e => setB2bData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={b2bData.phone}
                        onChange={e => setB2bData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="Mobile"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-bold text-gray-300 uppercase tracking-wider mb-1">
                        State & City *
                      </label>
                      <input
                        type="text"
                        required
                        value={b2bData.stateCity}
                        onChange={e => setB2bData(prev => ({ ...prev, stateCity: e.target.value }))}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="e.g. Maharashtra, Nashik"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Quantity Target
                      </label>
                      <select
                        value={b2bData.quantity}
                        onChange={e => setB2bData(prev => ({ ...prev, quantity: e.target.value }))}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent text-primary-dark"
                      >
                        <option value="10-50 units">10 to 50 Units (MOQ)</option>
                        <option value="50-100 units">50 to 100 Units</option>
                        <option value="100+ units">100+ Units (Container)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Message / Custom Branding Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={b2bData.message}
                      onChange={e => setB2bData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Specify models, custom windings, packing details..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={b2bStatus === "submitting"}
                    className="w-full rounded-lg bg-accent py-3 text-center font-bold text-primary-dark shadow hover:bg-accent-light transition-colors disabled:opacity-50"
                  >
                    {b2bStatus === "submitting" ? "Registering..." : "Submit B2B Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product-Specific Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Quality Proof
          </span>
          <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Dealer Feedback on Product Durability
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {productTestimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-primary/5 bg-cream/10 p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-body text-[10px] font-bold text-accent uppercase">
                  {t.category}
                </span>
                <p className="font-body text-sm italic text-foreground/80 leading-relaxed mt-4">
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
      </section>

      {/* 5. CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActionBanner
          title="Can't Find What You're Looking For?"
          subtitle="We customize impellers, seals, spray booms, and diesel sets. Share your specifications with our engineering desk."
          ctaText="Submit Specifications"
          ctaLink="/contact#enquiry-form"
        />
      </section>
    </div>
  );
}
