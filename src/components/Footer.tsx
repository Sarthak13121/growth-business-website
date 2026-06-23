"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import { COMPANY_PROFILE, PRODUCTS } from "@/data/localMockPayload";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));

  return (
    <footer className="w-full bg-[#0A1045] text-white border-t-4 border-accent">
      {/* Main Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Certifications */}
          <div className="flex flex-col space-y-5">
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-white block">
                MEHTA AGRO
              </span>
              <span className="text-xs font-bold tracking-widest text-accent uppercase block -mt-1">
                INDUSTRIES
              </span>
            </div>
            <p className="text-sm text-gray-300 font-body leading-relaxed">
              Empowering farmers across 18 states and 6 countries with premium, government-certified irrigation pumps, drip components, and diesel engines. Built on trust since 1994.
            </p>
            <div className="flex items-center gap-2 rounded bg-white/5 p-3 border border-white/10">
              <ShieldCheck className="h-6 w-6 text-accent shrink-0" />
              <span className="text-xs text-gray-200 leading-tight">
                BIS, ISI, ISO 9001:2015 & Govt-Certified Export House
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold text-accent tracking-wider uppercase mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-sm font-body">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  About Our Journey
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  Agricultural Catalog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  Factory & Expo Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  Distributor Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h3 className="text-base font-bold text-accent tracking-wider uppercase mb-6">
              Product Lines
            </h3>
            <ul className="space-y-3.5 text-sm font-body">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-5">
            <h3 className="text-base font-bold text-accent tracking-wider uppercase mb-2">
              Corporate Office
            </h3>
            <ul className="space-y-4 text-sm font-body text-gray-300">
              <li className="flex gap-2 items-start">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{COMPANY_PROFILE.location}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href={`tel:${COMPANY_PROFILE.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_PROFILE.phone}
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href={`mailto:${COMPANY_PROFILE.email}`} className="hover:text-white transition-colors">
                  {COMPANY_PROFILE.email}
                </a>
              </li>
            </ul>
            <a
              href="https://maps.google.com/?q=Plot+No.+128+Phase+I+GIDC+Naroda+Ahmedabad+Gujarat+382330"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-accent hover:bg-white/15 transition-all border border-accent/20"
            >
              Open in Google Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-body">
          <p>© {currentYear} {COMPANY_PROFILE.name}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:underline hover:text-gray-300">Privacy Policy</Link>
            <Link href="/contact" className="hover:underline hover:text-gray-300">Terms of Service</Link>
            <Link href="/about" className="hover:underline hover:text-gray-300">Certifications</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
