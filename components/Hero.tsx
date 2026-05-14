"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Countdown from "./Countdown";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate min-h-screen overflow-hidden pt-16 sm:pt-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-br from-golden/25 via-transparent to-sunset/25" />
        <svg
          className="absolute bottom-0 left-0 w-full h-[35%] sm:h-[40%]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path fill="#2f4a3a" fillOpacity="0.9" d="M0,224L60,202.7C120,181,240,139,360,154.7C480,171,600,245,720,250.7C840,256,960,192,1080,176C1200,160,1320,192,1380,208L1440,224L1440,320L0,320Z" />
          <path fill="#1f3326" d="M0,288L80,272C160,256,320,224,480,224C640,224,800,256,960,261.3C1120,267,1280,245,1360,234.7L1440,224L1440,320L0,320Z" />
        </svg>
        {/* Sun — smaller, pushed to top-right corner */}
        <motion.div
          style={{ y, opacity }}
          className="absolute top-8 right-16 sm:top-16 sm:right-24 h-24 w-24 sm:h-36 sm:w-36 md:h-48 md:w-48 rounded-full bg-gradient-to-br from-yellow-100 via-golden to-sunset shadow-2xl shadow-sunset/40 animate-float-slow"
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 pb-24 sm:pb-28 pt-8 sm:pt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/30 bg-white/15 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur"
        >
          <span className="flex items-center gap-1"><Calendar size={12} /> Oct 24–25, 2026</span>
          <span className="h-1 w-1 rounded-full bg-white/50 hidden sm:block" />
          <span className="flex items-center gap-1"><MapPin size={12} /> Sugar Land, TX</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 sm:mt-5 font-display drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight tracking-tight">
            Sugar Land<br />
            <span className="text-golden">Bike Fest</span>
          </h1>
          <p className="mt-3 text-xl sm:text-2xl font-semibold italic text-cream/75">
            Ride. Race. Gather. Grow.
          </p>
        </motion.div>

        {/* Wider max-width to prevent awkward wrapping */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-4 sm:mt-6 max-w-2xl sm:max-w-3xl text-base sm:text-lg md:text-xl text-white/90 px-2 sm:px-0"
        >
          A community cycling festival weekend hosted by{" "}
          <a href="https://fbmba.org/" target="_blank" rel="noreferrer" className="font-bold text-white hover:underline underline-offset-2">Fort Bend Mountain Bike Association</a>{" "}
          — bringing together mountain bikers, gravel riders, BMX, road, and urban cyclists
          for a weekend of racing, riding and fun at The Crown Festival Park in Sugar Land, TX.
        </motion.p>

        {/* Countdown — extra bottom padding so labels don't clip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-10 pb-2"
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <a
            href="#subscribe"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-7 py-3.5 text-sm font-semibold text-sunset-deep shadow-lg shadow-black/10 hover:bg-cream transition-all hover:-translate-y-0.5 min-h-[44px]"
          >
            Get Updates <ArrowRight size={16} />
          </a>
          <a
            href="#activities"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 sm:px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition min-h-[44px]"
          >
            What&apos;s Happening
          </a>
        </motion.div>

        <motion.form
          id="subscribe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 sm:mt-10 flex w-full max-w-sm sm:max-w-md gap-2 rounded-full bg-white/95 p-1.5 shadow-xl shadow-black/10"
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
        </motion.form>
      </div>
    </section>
  );
}
