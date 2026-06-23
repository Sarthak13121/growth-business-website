"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, MessageSquare, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Clock, Plus, Loader2, Check } from "lucide-react";
import { COMPANY_PROFILE, REGIONAL_OFFICES, FAQS } from "@/data/localMockPayload";

function TypeWriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 4); // fast character type-on
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayedText}</>;
}

export default function ContactSystem() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "";

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    stateCity: "",
    nature: "Dealership Enquiry",
    category: "Irrigation Pumps",
    productName: initialProduct,
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // FAQ states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.stateCity.trim()) newErrors.stateCity = "State & City are required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");

    // Simulate EmailJS Integration
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Trigger confetti dynamically
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log("EmailJS form submitted successfully - Confetti simulated!");
      }

      setStatus("success");
      setFormData({
        name: "",
        company: "",
        phone: "",
        stateCity: "",
        nature: "Dealership Enquiry",
        category: "Irrigation Pumps",
        productName: "",
        message: ""
      });
    } catch (error) {
      setStatus("error");
    }
  };

  // WhatsApp Fallback link
  const getWhatsAppFallback = () => {
    const text = `Hello Mehta Agro Sales Team,\n\nI tried submitting the enquiry form but encountered an error. Here are my details:\nName: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nLocation: ${formData.stateCity}\nNature: ${formData.nature}\nMessage: ${formData.message}`;
    return `https://wa.me/${COMPANY_PROFILE.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-16">
      {/* 2-Column Enquiry Form + Google Maps */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12" id="enquiry-form">
        {/* Left Side: Enquiry Form */}
        <div className="lg:col-span-7 rounded-2xl border border-primary/5 bg-cream/20 p-8 shadow-sm">
          <h3 className="font-display text-2xl font-bold text-primary">
            Send Business Enquiry
          </h3>
          <p className="font-body text-sm text-foreground/60 mt-1 mb-6">
            Fill out the details below. Our corporate sales team will contact you within 24 hours.
          </p>

          {status === "success" ? (
            <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center text-green-800 space-y-3">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
              <h4 className="font-display text-lg font-bold">Enquiry Submitted!</h4>
              <p className="font-body text-sm">
                Thank you for contacting Mehta Agro Industries. Our regional sales representative will call you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-green-700 transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-body">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-foreground/80 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? "border-red-500" : "border-primary/10"
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="company" className="block text-xs font-bold text-foreground/80 uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter firm name (Optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Phone (+91 Prefix UI) */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-foreground/80 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-foreground/50 border-r border-primary/10 pr-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border bg-white pl-14 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.phone ? "border-red-500" : "border-primary/10"
                      }`}
                      placeholder="10-digit mobile"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* State & City */}
                <div>
                  <label htmlFor="stateCity" className="block text-xs font-bold text-foreground/80 uppercase tracking-wider mb-1.5">
                    State & City *
                  </label>
                  <input
                    type="text"
                    id="stateCity"
                    name="stateCity"
                    value={formData.stateCity}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.stateCity ? "border-red-500" : "border-primary/10"
                    }`}
                    placeholder="e.g. Gujarat, Ahmedabad"
                  />
                  {errors.stateCity && <p className="text-xs text-red-500 mt-1">{errors.stateCity}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Nature of Enquiry */}
                <div>
                  <label htmlFor="nature" className="block text-xs font-bold text-foreground/80 uppercase tracking-wider mb-1.5">
                    Nature of Enquiry
                  </label>
                  <select
                    id="nature"
                    name="nature"
                    value={formData.nature}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Dealership Enquiry">Dealership Enquiry</option>
                    <option value="Bulk Order & Wholesale">Bulk Order & Wholesale</option>
                    <option value="Export Account Setup">Export Account Setup</option>
                    <option value="Custom OEM Branding">Custom OEM Branding</option>
                    <option value="Product Technical Support">Product Technical Support</option>
                  </select>
                </div>

                {/* Product Category */}
                <div>
                  <label htmlFor="category" className="block text-xs font-bold text-foreground/80 uppercase tracking-wider mb-1.5">
                    Product Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Irrigation Pumps">Irrigation Pumps</option>
                    <option value="Crop Sprayers">Crop Sprayers</option>
                    <option value="Drip System Components">Drip System Components</option>
                    <option value="Diesel Engine Sets">Diesel Engine Sets</option>
                    <option value="Spare Parts & Consumables">Spare Parts & Consumables</option>
                  </select>
                </div>
              </div>

              {/* Product Name (Optional) */}
              <div>
                <label htmlFor="productName" className="block text-xs font-bold text-foreground/80 uppercase tracking-wider mb-1.5">
                  Interested Product Model
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Monoblock Pump (MB-50) (Optional)"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-foreground/80 uppercase tracking-wider mb-1.5">
                  Message / Requirements *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.message ? "border-red-500" : "border-primary/10"
                  }`}
                  placeholder="Describe your requirements, order quantities, or questions..."
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              {status === "error" && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800 flex items-start gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Form Submission Failed:</span> There was a connection issue. Please retry or click below to send via WhatsApp:
                    <a
                      href={getWhatsAppFallback()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block font-bold text-[#25D366] hover:underline"
                    >
                      Fallback: Send via WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full rounded-xl py-3.5 text-center font-body text-sm font-bold text-white shadow transition-all duration-300 flex items-center justify-center gap-2 ${
                  status === "submitting"
                    ? "bg-primary-light/95 disabled:cursor-not-allowed"
                    : status === "error"
                    ? "bg-red-600 animate-shake"
                    : "bg-primary hover:bg-primary-light hover:scale-[1.01]"
                }`}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin text-accent" />
                    Sending...
                  </>
                ) : status === "error" ? (
                  "Error: Shake & Retry"
                ) : (
                  "Submit Enquiry"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Google Maps & Office Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-2xl border border-primary/5 bg-cream/20 p-6 shadow-sm flex flex-col h-full">
            <h3 className="font-display text-xl font-bold text-primary mb-4">
              Real Factory Location
            </h3>
            
            {/* Google Map Frame */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-cream border border-primary/5 flex-grow mb-4">
              <iframe
                title="Mehta Agro Industries Factory Location Map"
                src="https://maps.google.com/maps?q=Plot%20No.%20128,%20Phase%20I,%20GIDC,%20Naroda,%20Ahmedabad,%20Gujarat%20382330&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 items-start">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="text-sm font-body text-foreground/80">
                  <span className="font-bold text-primary block">Factory & Registered Office</span>
                  {COMPANY_PROFILE.location}
                </div>
              </div>
              
              <div className="flex gap-2 items-center">
                <Clock className="h-5 w-5 text-accent shrink-0" />
                <div className="text-sm font-body text-foreground/80">
                  <span className="font-bold text-primary">Office Hours: </span>
                  Mon - Sat: 9:00 AM to 6:00 PM (Sunday Closed)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Presence Strip */}
      <div className="space-y-6">
        <h3 className="font-display text-2xl font-bold text-primary text-center">
          Our Regional Presence
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {REGIONAL_OFFICES.map((office) => (
            <div
              key={office.title}
              className="rounded-2xl border border-primary/5 bg-cream/10 p-6 hover:border-primary/20 shadow-sm transition-all"
            >
              <h4 className="font-display text-base font-bold text-primary">
                {office.title}
              </h4>
              <p className="font-body text-xs text-accent font-semibold tracking-wider uppercase mt-1">
                {office.role}
              </p>
              <p className="font-body text-xs text-foreground/70 mt-3 flex items-start gap-1.5">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                {office.address}
              </p>
              <div className="mt-4 border-t border-primary/5 pt-3 flex flex-col gap-2 font-body text-xs text-primary-light">
                <a href={`tel:${office.phone}`} className="flex items-center gap-1.5 font-bold hover:underline">
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="flex items-center gap-1.5 font-bold hover:underline">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  {office.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Standards + FAQ Accordion */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 border-t border-primary/5 pt-12">
        {/* Service Standards */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display text-2xl font-bold text-primary">
            Our Service Standards
          </h3>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">
            Mehta Agro Industries operates under strict performance benchmarks to support our dealer network.
          </p>

          <div className="space-y-4 font-body">
            {/* Standard 1 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                <span>Enquiry Response Time</span>
                <span className="text-primary">&lt; 4 Hours</span>
              </div>
              <div className="h-2 w-full rounded-full bg-cream overflow-hidden">
                <div className="h-full rounded-full bg-accent w-[95%]" />
              </div>
            </div>
            {/* Standard 2 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                <span>Dealer Dispatch Timeline</span>
                <span className="text-primary">&lt; 5 Days</span>
              </div>
              <div className="h-2 w-full rounded-full bg-cream overflow-hidden">
                <div className="h-full rounded-full bg-accent w-[90%]" />
              </div>
            </div>
            {/* Standard 3 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                <span>Quality Defect Rate</span>
                <span className="text-primary">&lt; 0.1%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-cream overflow-hidden">
                <div className="h-full rounded-full bg-accent w-[98%]" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="lg:col-span-7 space-y-4" id="faq-section">
          <h3 className="font-display text-2xl font-bold text-primary">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-3 font-body">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "bg-cream/25 border-accent/25 shadow-sm" 
                      : "bg-cream/10 border-primary/5"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-primary focus:outline-none"
                  >
                    <span className="text-sm">{faq.question}</span>
                    <Plus 
                      className={`h-4.5 w-4.5 shrink-0 text-accent transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`} 
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-foreground/75 leading-relaxed border-t border-primary/5">
                      <TypeWriterText text={faq.answer} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
