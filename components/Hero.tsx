"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Countdown from "./Countdown";

const L = "/images/Sugar Land Bike Fest Logo";

export default function Hero() {
  // Track window scroll (not a section) — logo reacts to overall page scroll
  const { scrollY } = useScroll();

  // Each layer scatters to its corner over the first 500px of scroll, then stays
  // Pink — "SUGAR" — top-left corner
  const pinkX   = useTransform(scrollY, [0, 500], [0, -300]);
  const pinkY   = useTransform(scrollY, [0, 500], [0, -15]);
  const pinkRot = useTransform(scrollY, [0, 500], [0, -12]);
  const pinkOp  = useTransform(scrollY, [0, 200, 500], [1, 0.5, 0.25]);

  // Cyan — "LAND" + banner — top-right corner
  const cyanX   = useTransform(scrollY, [0, 500], [0, 280]);
  const cyanY   = useTransform(scrollY, [0, 500], [0, -110]);
  const cyanRot = useTransform(scrollY, [0, 500], [0, 12]);
  const cyanOp  = useTransform(scrollY, [0, 200, 500], [1, 0.5, 0.25]);

  // Dark — "BIKE" + gear + FBMBA — bottom-left corner
  const darkX   = useTransform(scrollY, [0, 500], [0, -280]);
  const darkY   = useTransform(scrollY, [0, 500], [0, 150]);
  const darkRot = useTransform(scrollY, [0, 500], [0, -12]);
  const darkOp  = useTransform(scrollY, [0, 200, 500], [1, 0.5, 0.50]);

  // Yellow — "FEST" + lightning — bottom-right corner
  const yellowX   = useTransform(scrollY, [0, 500], [0, 280]);
  const yellowY   = useTransform(scrollY, [0, 500], [0, 70]);
  const yellowRot = useTransform(scrollY, [0, 500], [0, 12]);
  const yellowOp  = useTransform(scrollY, [0, 200, 500], [1, 0.5, 0.25]);

  // Banner — stays in place, fades to match dark blue final opacity
  const bannerOp = useTransform(scrollY, [0, 200, 500], [1, 0.5, 0.50]);

  const layers = [
    { src: `${L}/logo-dark.png`,   x: darkX,   y: darkY,   rotate: darkRot,   opacity: darkOp   },
    { src: `${L}/logo-pink.png`,   x: pinkX,   y: pinkY,   rotate: pinkRot,   opacity: pinkOp   },
    { src: `${L}/logo-yellow.png`, x: yellowX, y: yellowY, rotate: yellowRot, opacity: yellowOp },
    { src: `${L}/logo-cyan.png`,   x: cyanX,   y: cyanY,   rotate: cyanRot,   opacity: cyanOp   },
  ];

  return (
    <>
      {/* ── Fixed logo — stays on screen as the rest of the page scrolls ── */}
      <div
        className="fixed inset-0 z-[5] flex items-start justify-center pt-14"
        style={{ pointerEvents: "none" }}
        aria-hidden
      >
        <div
          className="relative w-[min(88vw,640px)] flex-shrink-0"
          style={{ aspectRatio: "1198 / 950", pointerEvents: "none" }}
        >
          {layers.map(({ src, x, y, rotate, opacity }) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              style={{ x, y, rotate, opacity, pointerEvents: "none" }}
            >
              <Image src={src} alt="" fill className="object-contain pointer-events-none" priority />
            </motion.div>
          ))}

          {/* FBMBA Banner — decorative overlay, no interaction */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: bannerOp, pointerEvents: "none" }}
          >
            <Image
              src={`${L}/Sugar Land Bike Fest - FBMBA Banner.png`}
              alt="FBMBA Presents"
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* ── Hero section — scrolls over the fixed logo ── */}
      <section id="hero" className="relative z-[10] min-h-screen overflow-hidden">
        {/* Forest wave at bottom */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <svg
            className="absolute bottom-0 left-0 w-full h-[30%] sm:h-[35%]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path fill="#2f4a3a" fillOpacity="0.9" d="M0,224L60,202.7C120,181,240,139,360,154.7C480,171,600,245,720,250.7C840,256,960,192,1080,176C1200,160,1320,192,1380,208L1440,224L1440,320L0,320Z" />
            <path fill="#1f3326" d="M0,288L80,272C160,256,320,224,480,224C640,224,800,256,960,261.3C1120,267,1280,245,1360,234.7L1440,224L1440,320L0,320Z" />
          </svg>
        </div>

        {/* Content panel — pushed to bottom half so logo is visible above it */}
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 pt-[93vh] pb-20 sm:pb-28">
          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mb-3 flex flex-col items-center text-white/50"
          >
            <ChevronDown size={28} strokeWidth={1.5} />
          </motion.div>
          <div className="w-full max-w-2xl rounded-3xl bg-[#0e0c0a]/70 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40 px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center">

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-white leading-[0.95] text-center">
              Ride. Race.
              <br />
              <span className="italic text-cream">Gather. Grow.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-cream/80 text-center">
              A community cycling festival weekend hosted by{" "}
              <a href="https://fbmba.org/" target="_blank" rel="noreferrer" className="font-semibold text-white hover:underline underline-offset-2">
                Fort Bend Mountain Bike Association
              </a>
              {" "}— The Crown Festival Park, Sugar Land, TX · Oct 24–25, 2026
            </p>

            <div className="mt-6 sm:mt-8 pb-2">
              <Countdown />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-7 py-3.5 text-sm font-semibold text-sunset-deep shadow-lg shadow-black/20 hover:bg-cream transition-all hover:-translate-y-0.5 min-h-[44px]"
              >
                Get Updates <ArrowRight size={16} />
              </a>
              <a
                href="#activities"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 bg-cream/10 px-6 sm:px-7 py-3.5 text-sm font-semibold text-cream hover:bg-cream/20 transition min-h-[44px]"
              >
                What&apos;s Happening
              </a>
            </div>

            <form
              id="subscribe"
              className="mt-5 sm:mt-6 flex w-full max-w-sm sm:max-w-md gap-2 rounded-full bg-white p-1.5 shadow-xl shadow-black/15"
              action="/api/subscribe"
              method="post"
            >
              <input
                type="email"
                required
                name="email"
                placeholder="you@example.com"
                className="flex-1 min-w-0 rounded-full bg-transparent px-4 sm:px-5 py-2.5 text-sm text-ink placeholder:text-ink/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-sunset px-4 sm:px-5 py-2.5 text-sm font-semibold text-white hover:bg-sunset-deep transition min-h-[40px]"
              >
                Notify Me
              </button>
            </form>

          </div>
        </div>
      </section>
    </>
  );
}
