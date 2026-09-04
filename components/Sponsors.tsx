"use client";
import { useState } from "react";
import Image from "next/image";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SponsorModal from "./ui/SponsorModal";
import { Megaphone, ArrowRight } from "lucide-react";
import { sponsorLogos, eventSponsorLogos, mtbRaceSponsorLogos, type SponsorLogo } from "@/content/sponsors";

function openWithScroll(id: string, open: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(open, 500);
}

// base px dimensions [mobileH, mobileW, desktopH, desktopW] per tier
const TILE_BASE = {
  featuredSquare: [297, 297, 357, 357],
  featured: [192, 384, 240, 480],
  boosted: [128, 256, 160, 320],
  topBanner: [112, 320, 128, 416],
  banner: [56, 160, 64, 208],
  square: [99, 99, 119, 119],
  wide: [64, 128, 80, 160],
} as const;

function LogoTile({ s, scale = 1 }: { s: SponsorLogo; scale?: number }) {
  const tier = s.featured && s.square
    ? "featuredSquare"
    : s.featured
    ? "featured"
    : s.boosted
    ? "boosted"
    : s.topBanner
    ? "topBanner"
    : s.banner
    ? "banner"
    : s.square
    ? "square"
    : "wide";
  // featured tiers ignore scale — they're already the largest, deliberately-sized tier
  const effectiveScale = tier === "featured" || tier === "featuredSquare" ? 1 : scale;
  const [mh, mw, dh, dw] = TILE_BASE[tier].map((px) => Math.round(px * effectiveScale));
  // Static, literal arbitrary-value classes referencing CSS vars — Tailwind can only
  // generate CSS for class names it sees literally in source, so the actual computed
  // pixel values are passed through inline style instead of being interpolated into
  // the class string.
  const sizeClass = "h-[var(--tile-mh)] w-[var(--tile-mw)] sm:h-[var(--tile-dh)] sm:w-[var(--tile-dw)]";
  const sizeStyle = {
    "--tile-mh": `${mh}px`,
    "--tile-mw": `${mw}px`,
    "--tile-dh": `${dh}px`,
    "--tile-dw": `${dw}px`,
  } as React.CSSProperties;
  const sizesAttr = `(max-width: 640px) ${mw}px, ${dw}px`;
  if (!s.logoSrc) {
    return (
      <div
        style={sizeStyle}
        className={`grid place-items-center overflow-hidden rounded-xl border border-dashed border-cream/25 bg-white/5 px-3 text-center text-xs font-medium text-cream/40 ${sizeClass}`}
      >
        {s.name}
      </div>
    );
  }
  return (
    <div style={sizeStyle} className={`relative overflow-hidden rounded-xl bg-white/95 shadow-md ${sizeClass}`}>
      <Image
        src={s.logoSrc}
        alt={s.name}
        fill
        sizes={sizesAttr}
        className={`object-contain ${s.square ? "p-0.5" : "p-1.5"}`}
      />
    </div>
  );
}

function LogoStrip({ label, logos, scale = 1 }: { label: string; logos: SponsorLogo[]; scale?: number }) {
  if (logos.length === 0) return null;
  const featured = logos.filter((s) => s.featured);
  const boosted = logos.filter((s) => !s.featured && s.boosted);
  const topBanner = logos.filter((s) => !s.featured && !s.boosted && s.topBanner);
  const banner = logos.filter((s) => !s.featured && !s.boosted && !s.topBanner && s.banner);
  const wide = logos.filter((s) => !s.featured && !s.boosted && !s.topBanner && !s.banner && !s.square);
  const square = logos.filter((s) => !s.featured && !s.boosted && !s.topBanner && !s.banner && s.square);
  return (
    <Reveal>
      <div className="mb-8 space-y-3 sm:space-y-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
          {label}
        </p>
        {featured.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {featured.map((s) => <LogoTile key={s.name} s={s} scale={scale} />)}
          </div>
        )}
        {boosted.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {boosted.map((s) => <LogoTile key={s.name} s={s} scale={scale} />)}
          </div>
        )}
        {topBanner.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {topBanner.map((s) => <LogoTile key={s.name} s={s} scale={scale} />)}
          </div>
        )}
        {wide.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {wide.map((s) => <LogoTile key={s.name} s={s} scale={scale} />)}
          </div>
        )}
        {banner.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {banner.map((s) => <LogoTile key={s.name} s={s} scale={scale} />)}
          </div>
        )}
        {square.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {square.map((s) => <LogoTile key={s.name} s={s} scale={scale} />)}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function Sponsors() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Section
      id="sponsors"
      eyebrow="Sponsors & Vendors"
      title="Powered by Our Partners"
      accent="sunset"
    >
      <LogoStrip label="MTB Race Sponsor" logos={mtbRaceSponsorLogos} />
      <LogoStrip label="Retail Sponsors" logos={eventSponsorLogos} />
      <LogoStrip label="FBMBA Sponsors" logos={sponsorLogos} scale={1.15} />

      <Reveal>
        <div className="mb-6 text-center">
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-cream">
            Put your brand on the start line.
          </h3>
          <p className="mt-2 text-sm sm:text-base text-cream/65 leading-relaxed max-w-2xl mx-auto">
            Reach thousands of cyclists, families, and outdoor enthusiasts across the Greater Houston region. Sponsorship dollars fund FBMBA trail maintenance and improvements.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-2xl sm:rounded-3xl border border-ink/10 bg-cream-warm/70 backdrop-blur p-5 sm:p-8 md:p-10 mb-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-2xl bg-sunset text-white shadow-lg shadow-sunset/30">
                <Megaphone size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-forest-deep">
                  Become a sponsor
                </h3>
                <p className="mt-1 text-sm sm:text-base text-ink/70 max-w-md">
                  Multiple tiers available — from title naming rights to community-level in-kind support.
                  Custom packages welcome.
                </p>
              </div>
            </div>
            <button
              onClick={() => openWithScroll("sponsors", () => setModalOpen(true))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-sunset px-6 py-3 font-semibold text-sm text-white shadow-lg shadow-sunset/30 hover:bg-sunset-deep transition-all hover:-translate-y-0.5 min-h-[44px]"
            >
              View Sponsorship Tiers <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Reveal>

<SponsorModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Section>
  );
}
