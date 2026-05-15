import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const SITE_URL = "https://sugarlandbikefest.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sugar Land Bike Fest — Oct 24–25, 2026",
    template: "%s · Sugar Land Bike Fest",
  },
  description:
    "A community cycling festival in Sugar Land, TX. MTB time trial, pump track racing, group rides, vendors, food trucks, and kids zone — built around FBMBA's race weekend.",
  openGraph: {
    title: "Sugar Land Bike Fest — Oct 24–25, 2026",
    description:
      "Ride. Celebrate. Sugar Land. A two-day community cycling festival hosted by FBMBA.",
    url: SITE_URL,
    siteName: "Sugar Land Bike Fest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sugar Land Bike Fest",
    description: "Ride. Celebrate. Sugar Land. Oct 24–25, 2026.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1e3528",
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Sugar Land Bike Fest",
  startDate: "2026-10-24T08:00:00-05:00",
  endDate: "2026-10-25T18:00:00-05:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Sugar Land, TX (venue TBA)",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sugar Land",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Fort Bend Mountain Bike Association",
    url: "https://fbmba.org",
  },
  description:
    "Two-day community cycling festival featuring MTB time trial, pump track racing, group rides, vendors, food trucks, and kids zone.",
  image: [`${SITE_URL}/og.png`],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        {/* Aerial background with Ken Burns pan */}
        <div className="fixed inset-x-0 top-0 -z-20 overflow-hidden" style={{ height: "100lvh" }}>
          <div
            className="animate-ken-burns absolute inset-[-8%] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg.jpg')" }}
          />
          {/* Dark tint overlay */}
          <div className="absolute inset-0 bg-[#0a0d0a]/65" />
          {/* Warm colour cast */}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/40 via-transparent to-sunset/10" />
          {/* Very light blur so image reads as texture not detail */}
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        <Nav />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
