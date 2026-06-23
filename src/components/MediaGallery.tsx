"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/localMockPayload";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaGallery() {
  const tabs = ["All", "Factory", "Products", "Team", "Certifications & Events"];
  const [selectedTab, setSelectedTab] = useState("All");
  
  // Filtered gallery items
  const filteredItems = selectedTab === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedTab);

  // Lightbox States
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation support (Arrow keys + Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, currentIndex]);

  return (
    <div className="space-y-10">
      {/* Category Tab Selector */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-primary/5 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              setIsOpen(false); // Close lightbox if tab changes
            }}
            className={`rounded-full px-5 py-2.5 font-body text-xs font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
              selectedTab === tab
                ? "bg-primary text-white shadow"
                : "bg-cream/40 text-foreground hover:bg-cream"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Masonry Photo Grid (pure CSS columns) */}
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="break-inside-avoid relative overflow-hidden rounded-2xl bg-cream cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300"
          >
            <motion.img
              layoutId={`gallery-img-${item.id}`}
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/30 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="rounded-full bg-accent/90 self-start px-2.5 py-0.5 font-body text-[9px] font-bold tracking-wider text-primary-dark uppercase mb-2">
                {item.category}
              </span>
              <h3 className="font-display text-sm font-bold text-white leading-snug">
                {item.title}
              </h3>
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay with shared element zoom */}
      <AnimatePresence>
        {isOpen && filteredItems[currentIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          >
            {/* Close Trigger */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white z-20"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Arrow */}
            <button
              onClick={prevPhoto}
              className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 focus:outline-none z-20"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Center Image Container */}
            <div className="flex flex-col items-center max-w-4xl max-h-[80vh] w-full z-10">
              <motion.img
                layoutId={`gallery-img-${filteredItems[currentIndex].id}`}
                src={filteredItems[currentIndex].image}
                alt={filteredItems[currentIndex].title}
                className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              {/* Title & Counter */}
              <div className="mt-4 text-center text-white">
                <span className="rounded-full bg-accent/90 px-3 py-0.5 font-body text-[10px] font-bold tracking-wider text-primary-dark uppercase">
                  {filteredItems[currentIndex].category}
                </span>
                <h3 className="mt-2 font-display text-base font-bold sm:text-lg">
                  {filteredItems[currentIndex].title}
                </h3>
                <p className="mt-1 font-body text-xs text-gray-400">
                  Photo {currentIndex + 1} of {filteredItems.length}
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextPhoto}
              className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 focus:outline-none z-20"
              aria-label="Next Photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
