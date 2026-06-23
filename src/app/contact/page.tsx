"use client";

import React, { Suspense } from "react";
import ContactSystem from "@/components/ContactSystem";
import ActionBanner from "@/components/ActionBanner";
import { Phone, Mail, MapPin, MessageCircle, Heart, Star, Send } from "lucide-react";
import { COMPANY_PROFILE } from "@/data/localMockPayload";

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${COMPANY_PROFILE.phone.replace(/[^0-9]/g, "")}?text=Hello%20Mehta%20Agro%20Sales%20Team%2C%20I%20want%20to%20connect%20with%20you.`;
  const callUrl = `tel:${COMPANY_PROFILE.phone}`;

  const contactOptions = [
    { label: "Phone Support", value: COMPANY_PROFILE.phone, href: callUrl, desc: "Call corporate sales desk", icon: Phone },
    { label: "WhatsApp Business", value: "Chat Now", href: whatsappUrl, desc: "Immediate responses", icon: MessageCircle },
    { label: "Email Support", value: COMPANY_PROFILE.email, href: `mailto:${COMPANY_PROFILE.email}`, desc: "Direct sales desk email", icon: Mail },
    { label: "Registered Plant", value: "Visit GIDC Naroda", href: "https://maps.google.com/?q=Plot+No.+128+Phase+I+GIDC+Naroda+Ahmedabad+Gujarat+382330", desc: "Mon-Sat: 9:00 - 18:00", icon: MapPin }
  ];

  const socialLinks = [
    { name: "Facebook", followers: "12K Followers", desc: "Farmer guides & reels", href: "#", color: "bg-[#1877F2]/10 text-[#1877F2]" },
    { name: "Instagram", followers: "8K Followers", desc: "@mehtaagro daily posts", href: "#", color: "bg-[#E1306C]/10 text-[#E1306C]" },
    { name: "LinkedIn", followers: "3.5K Network", desc: "Corporate announcements", href: "#", color: "bg-[#0A66C2]/10 text-[#0A66C2]" },
    { name: "YouTube", followers: "25K Subscribers", desc: "Pumps performance tests", href: "#", color: "bg-[#FF0000]/10 text-[#FF0000]" }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Page Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0A1045] to-[#1A237E] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,160,23,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,160,23,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="rounded-full bg-accent/20 border border-accent/30 px-4 py-1 text-xs font-bold text-accent uppercase tracking-wider">
            Contact Channels
          </span>
          <h1 className="font-display text-3xl font-black md:text-5xl leading-tight text-white">
            Connect With Sales Desk
          </h1>
          <p className="mx-auto max-w-2xl font-body text-sm md:text-base text-gray-300">
            Reach out to Mehta Agro Industries by phone, WhatsApp, email, or schedule a physical factory tour.
          </p>

          {/* 3 Clickable Floating Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={callUrl}
              className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200 transition-colors"
            >
              📞 Call Sales Support
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200 transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
            <a
              href="#enquiry-form"
              className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2 font-body text-xs font-bold text-gray-200 transition-colors"
            >
              📍 View Factory Pin
            </a>
          </div>
        </div>
      </section>

      {/* 2. Contact Options Strip (4 Boxes) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 font-body">
          {contactOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <a
                key={opt.label}
                href={opt.href}
                target={opt.href.startsWith("http") ? "_blank" : undefined}
                rel={opt.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-2xl border border-primary/5 bg-cream/15 p-6 text-center hover:border-accent hover:shadow-md transition-all group"
              >
                <div className="mx-auto h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground/50 uppercase tracking-wider mb-1">
                  {opt.label}
                </h3>
                <p className="font-body text-sm font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                  {opt.value}
                </p>
                <p className="text-[11px] text-foreground/60 mt-1">
                  {opt.desc}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* 3. Enquiry Form + Google Maps + Regionals + FAQs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <ContactSystem />
        </Suspense>
      </section>

      {/* 4. Social Media Links Platform Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="font-body text-xs font-bold text-accent tracking-wider uppercase">
            Community
          </span>
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            Join Our Digital Agricultural Networks
          </h2>
          <p className="font-body text-sm text-foreground/50">
            Get updates, support files, and watch product capabilities.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 font-body">
          {socialLinks.map((soc) => (
            <a
              key={soc.name}
              href={soc.href}
              className="rounded-2xl border border-primary/5 bg-cream/15 p-6 text-center hover:shadow-md transition-all group"
            >
              <div className={`mx-auto h-12 w-12 rounded-xl flex items-center justify-center mb-4 font-bold text-lg ${soc.color}`}>
                {soc.name[0]}
              </div>
              <h3 className="font-display text-base font-bold text-primary group-hover:text-accent transition-colors">
                {soc.name}
              </h3>
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mt-1">
                {soc.followers}
              </span>
              <p className="text-xs text-foreground/60 mt-1.5 leading-relaxed">
                {soc.desc}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActionBanner
          title="Ready to Place Your Order?"
          subtitle="Call our corporate desk directly or send email requirements. Our operations director Rajesh Mehta handles wholesale setups."
          ctaText="Dial Corporate Sales"
          ctaLink={`tel:${COMPANY_PROFILE.phone}`}
          showCallCTA={false}
        />
      </section>
    </div>
  );
}
