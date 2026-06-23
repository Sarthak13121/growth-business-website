"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0, opacity: 0 });

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    // Timeout gives NextJS App Router layout time to mount the new route elements
    const timer = setTimeout(() => {
      const activeEl = document.querySelector(`.nav-links-container a[data-path="${pathname}"]`) as HTMLElement;
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-40 w-full border-b border-primary/10 bg-warm-ivory/80 backdrop-blur-md transition-all duration-300 ${
        scrolled 
          ? "shadow-[0_10px_30px_rgba(26,35,126,0.12),0_1px_8px_rgba(26,35,126,0.06)] py-1.5" 
          : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Brand */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="group flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-primary transition-colors group-hover:text-primary-light sm:text-2xl">
                MEHTA AGRO
              </span>
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase -mt-1">
                INDUSTRIES
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 relative nav-links-container h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-path={link.href}
                  className={`font-body text-sm font-semibold tracking-wide transition-colors hover:text-primary-light h-full flex items-center ${
                    isActive ? "text-primary font-bold" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Sliding Underline Indicator */}
            <span
              className="absolute bottom-5 h-0.5 bg-accent transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity
              }}
            />
          </div>

          {/* Get Quote Button */}
          <div className="hidden md:block">
            <Link
              href="/contact#enquiry-form"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-bold text-white shadow-md transition-all hover:bg-primary-light hover:shadow-lg active:scale-95"
            >
              Get Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-primary hover:bg-cream active:scale-95 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden border-t border-primary/5 bg-warm-ivory py-4 px-6 shadow-xl transition-all duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-body text-base font-semibold tracking-wide py-2 ${
                    isActive ? "text-primary border-l-4 border-accent pl-2 font-bold" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/contact#enquiry-form"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-body text-base font-bold text-white shadow-md"
            >
              Get Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
