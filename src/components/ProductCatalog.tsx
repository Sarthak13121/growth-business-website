"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MessageCircle, FileDown, Layers, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { PRODUCTS, Product, COMPANY_PROFILE } from "@/data/localMockPayload";
import TiltCard from "@/components/TiltCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Available categories
  const categories = [
    "All Products",
    "Irrigation Pumps",
    "Crop Sprayers",
    "Drip System Components",
    "Diesel Engine Sets",
    "Spare Parts & Consumables",
    "Wholesale & Export"
  ];

  // Selected Category State (driven by search parameters for search-engine-friendly URLs)
  const initialCategory = searchParams.get("category") || "All Products";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [activePillPop, setActivePillPop] = useState<string | null>(null);

  // Sync category state with query params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("All Products");
    }
  }, [searchParams]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActivePillPop(category);
    setTimeout(() => setActivePillPop(null), 250);

    if (category === "All Products") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?category=${encodeURIComponent(category)}`, { scroll: false });
    }
  };

  // Filtered Products list
  const filteredProducts = selectedCategory === "All Products"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // WhatsApp Message Generator
  const getWhatsAppLink = (productName: string) => {
    const text = `Hello Mehta Agro, I am interested in ${productName}. Please share pricing and availability.`;
    return `https://wa.me/${COMPANY_PROFILE.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  // Spec Accordion Toggle States
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({
    p1: false,
    p3: false,
    p5: false
  });

  const toggleSpec = (id: string) => {
    setExpandedSpecs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-12">
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 -mx-4 bg-warm-ivory/95 px-4 py-4 backdrop-blur border-b border-primary/5 sm:mx-0 sm:px-0">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 font-body text-xs font-bold transition-all ${
                activePillPop === cat ? "scale-110 duration-200 ease-out" : "duration-300"
              } focus:outline-none focus:ring-2 focus:ring-primary ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-md font-extrabold"
                  : "bg-cream/40 text-foreground hover:bg-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products Grid with Layout Shuffle Animations */}
      <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 35 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              key={product.id}
            >
              <TiltCard
                className="flex flex-col overflow-hidden rounded-2xl border border-primary/5 bg-cream/20 shadow-sm transition-all duration-300 group h-full"
              >
                {/* Image Wrap */}
                <div className="relative aspect-video w-full overflow-hidden bg-cream">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-primary/90 px-3 py-1 font-body text-[10px] font-bold tracking-wider text-white uppercase">
                    {product.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="flex flex-grow flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-primary leading-tight">
                    {product.name}
                  </h3>
                  {product.hpRange && (
                    <p className="mt-1.5 font-body text-xs font-bold text-accent tracking-wider uppercase">
                      Range: {product.hpRange}
                    </p>
                  )}
                  {product.capacity && (
                    <p className="mt-1.5 font-body text-xs font-bold text-accent tracking-wider uppercase">
                      Capacity: {product.capacity}
                    </p>
                  )}
                  {product.moq && (
                    <p className="mt-1.5 font-body text-xs font-bold text-primary-light">
                      MOQ: {product.moq}
                    </p>
                  )}
                  <p className="mt-3 flex-grow font-body text-sm text-foreground/80 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Technical Specifications Summary */}
                  <div className="mt-5 border-t border-primary/5 pt-4">
                    <h4 className="font-body text-xs font-bold text-foreground/90 uppercase tracking-wider mb-2">
                      Technical Specs:
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-body text-foreground/70">
                      {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                        <div key={key} className="flex flex-col">
                          <span className="font-semibold text-foreground/50">{key}</span>
                          <span className="font-bold text-foreground/80">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons Strip */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <a
                      href={getWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#25D366] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#20ba59] active:scale-95 transition-all"
                    >
                      <MessageCircle className="h-4 w-4 fill-white" />
                      WhatsApp Order
                    </a>
                    <a
                      href={`/contact?product=${encodeURIComponent(product.name)}#enquiry-form`}
                      className="inline-flex items-center justify-center rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-sm hover:bg-primary-light active:scale-95 transition-all"
                >
                  Ask for Price
                </a>
              </div>
            </div>
          </TiltCard>
        </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* PDF Catalogue Section */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-light p-8 text-white shadow-md">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-accent">
              Download Full Products Catalogue
            </h3>
            <p className="font-body text-sm text-gray-300 max-w-xl">
              Get our comprehensive technical documents, pumps curves, layouts, and spares list directly in English or Gujarati.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("English catalogue download started (mock)."); }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-body text-sm font-bold text-primary-dark shadow hover:bg-accent-light active:scale-95 transition-all"
            >
              <FileDown className="h-4 w-4" />
              English Catalogue (PDF)
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Gujarati catalogue download started (mock)."); }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-body text-sm font-bold text-white hover:bg-white/15 active:scale-95 transition-all"
            >
              <FileDown className="h-4 w-4" />
              ગુજરાતી કેટલોગ (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Technical Specifications Accordions */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="font-display text-2xl font-bold text-primary">
            Detailed Technical Specifications
          </h3>
          <p className="font-body text-sm text-foreground/60 mt-2">
            Click on major products below to see complete specs sheets.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Accordion 1 - MB-50 Pump */}
          <div className="rounded-xl border border-primary/10 bg-cream/10 overflow-hidden">
            <button
              onClick={() => toggleSpec("p1")}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-body font-bold text-primary focus:outline-none"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" />
                Premium Monoblock Pump (MB-50) Specs
              </span>
              {expandedSpecs.p1 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {expandedSpecs.p1 && (
              <div className="px-6 pb-6 pt-2 border-t border-primary/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-body">
                    <thead>
                      <tr className="border-b border-primary/10 text-primary font-bold">
                        <th className="py-2.5">HP Model</th>
                        <th className="py-2.5">Phase</th>
                        <th className="py-2.5">Suction Size</th>
                        <th className="py-2.5">Delivery Size</th>
                        <th className="py-2.5">Head Range</th>
                        <th className="py-2.5">Discharge (LPM)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 text-foreground/80">
                      <tr>
                        <td className="py-2.5 font-bold">3.0 HP</td>
                        <td className="py-2.5">3-Phase</td>
                        <td className="py-2.5">80 mm</td>
                        <td className="py-2.5">65 mm</td>
                        <td className="py-2.5">12-24 Meters</td>
                        <td className="py-2.5">600 - 350</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">5.0 HP</td>
                        <td className="py-2.5">3-Phase</td>
                        <td className="py-2.5">80 mm</td>
                        <td className="py-2.5">65 mm</td>
                        <td className="py-2.5">18-30 Meters</td>
                        <td className="py-2.5">900 - 450</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">7.5 HP</td>
                        <td className="py-2.5">3-Phase</td>
                        <td className="py-2.5">100 mm</td>
                        <td className="py-2.5">80 mm</td>
                        <td className="py-2.5">24-36 Meters</td>
                        <td className="py-2.5">1200 - 600</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2 - BS-16 Knapsack */}
          <div className="rounded-xl border border-primary/10 bg-cream/10 overflow-hidden">
            <button
              onClick={() => toggleSpec("p3")}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-body font-bold text-primary focus:outline-none"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" />
                Battery Operated Knapsack Sprayer (BS-16) Specs
              </span>
              {expandedSpecs.p3 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {expandedSpecs.p3 && (
              <div className="px-6 pb-6 pt-2 border-t border-primary/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-body">
                    <thead>
                      <tr className="border-b border-primary/10 text-primary font-bold">
                        <th className="py-2.5">Component</th>
                        <th className="py-2.5">Technical Standard</th>
                        <th className="py-2.5">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 text-foreground/80">
                      <tr>
                        <td className="py-2.5 font-bold">Tank Shell</td>
                        <td className="py-2.5">High Density Polyethylene (HDPE) UV-treated</td>
                        <td className="py-2.5">Corrosion resistant</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Rechargeable Battery</td>
                        <td className="py-2.5">12V 8Ah Sealed Lead-Acid battery</td>
                        <td className="py-2.5">4-5 hours operation charge</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Nozzle Types</td>
                        <td className="py-2.5">Conical, Fan-style, Sector, and Dual nozzle options</td>
                        <td className="py-2.5">Adjustable discharge</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3 - Drip Lateral */}
          <div className="rounded-xl border border-primary/10 bg-cream/10 overflow-hidden">
            <button
              onClick={() => toggleSpec("p5")}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-body font-bold text-primary focus:outline-none"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" />
                Flat Drip Lateral Pipe (16mm) Specs
              </span>
              {expandedSpecs.p5 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {expandedSpecs.p5 && (
              <div className="px-6 pb-6 pt-2 border-t border-primary/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-body">
                    <thead>
                      <tr className="border-b border-primary/10 text-primary font-bold">
                        <th className="py-2.5">Parameters</th>
                        <th className="py-2.5">16mm/0.2mm Class</th>
                        <th className="py-2.5">16mm/0.4mm Class</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 text-foreground/80">
                      <tr>
                        <td className="py-2.5 font-bold">Working Pressure</td>
                        <td className="py-2.5">0.8 - 1.2 kg/cm²</td>
                        <td className="py-2.5">1.0 - 1.5 kg/cm²</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Dripper Discharge</td>
                        <td className="py-2.5">2.0 Liters/hour</td>
                        <td className="py-2.5">2.4 Liters/hour</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Certification standard</td>
                        <td className="py-2.5">IS 13487 (Bureau of Indian Standards)</td>
                        <td className="py-2.5">IS 13487 Approved</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
