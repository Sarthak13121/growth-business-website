import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTAs from "@/components/FloatingCTAs";
import GlobalEffects from "@/components/GlobalEffects";
import { COMPANY_PROFILE } from "@/data/localMockPayload";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mehta Agro Industries - Certified Agricultural Equipment Manufacturer",
    template: "%s | Mehta Agro Industries",
  },
  description: "Established in 1994, Mehta Agro Industries is a leading manufacturer of ISI & BIS certified irrigation pumps, battery crop sprayers, drip irrigation systems, and diesel engines in Naroda GIDC, Ahmedabad, Gujarat.",
  keywords: ["agricultural equipment", "irrigation pumps Ahmedabad", "crop sprayers manufacturer", "drip irrigation components", "diesel engine sets", "export house certified", "Kantibhai Mehta", "Mehta Agro Industries GIDC", "irrigation pumps Naroda"],
  openGraph: {
    title: "Mehta Agro Industries - Quality Agricultural Equipment",
    description: "Premium ISO 9001:2015 certified manufacturer & wholesaler supplying 800+ dealers in 18 states and exporting to 6 countries.",
    url: "https://mehtaagro.com",
    siteName: "Mehta Agro Industries",
    locale: "en_IN",
    type: "website",
  },
  metadataBase: new URL("https://mehtaagro.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Local Business Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": COMPANY_PROFILE.name,
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    "@id": "https://mehtaagro.com/#corporate-identity",
    "url": "https://mehtaagro.com",
    "telephone": COMPANY_PROFILE.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 128, Phase I, GIDC, Naroda",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382330",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.0827,
      "longitude": 72.6560
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/mehtaagro",
      "https://www.instagram.com/mehtaagro",
      "https://www.linkedin.com/company/mehtaagro"
    ]
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-warm-ivory text-foreground font-body">
        <GlobalEffects />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingCTAs />
      </body>
    </html>
  );
}
