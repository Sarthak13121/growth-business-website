"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { COMPANY_PROFILE } from "@/data/localMockPayload";

export default function ActionBanner({
  title = "Ready to partner with Mehta Agro?",
  subtitle = "Join our network of 800+ distributors in 18 states. Request custom B2B bulk quotations today.",
  ctaText = "Contact Sales Desk",
  ctaLink = "/contact#enquiry-form",
  showCallCTA = true,
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  showCallCTA?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent to-[#D4A017] p-8 md:p-12 text-primary-dark shadow-xl">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left max-w-2xl">
          <h3 className="font-display text-2xl font-black md:text-3xl leading-tight">
            {title}
          </h3>
          <p className="font-body text-sm md:text-base font-medium opacity-90 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
          <Link
            href={ctaLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-bold text-white shadow-md hover:bg-primary-light active:scale-95 transition-all"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {showCallCTA && (
            <a
              href={`tel:${COMPANY_PROFILE.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/20 px-8 py-4 font-body text-sm font-bold text-primary hover:bg-white/35 active:scale-95 transition-all"
            >
              <PhoneCall className="h-4 w-4" />
              Call +91 98765 43210
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
