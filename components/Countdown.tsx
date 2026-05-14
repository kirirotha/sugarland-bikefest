"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET = new Date("2026-10-24T08:00:00-05:00").getTime();

function diff() {
  const now = Date.now();
  const ms = Math.max(0, TARGET - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-14 sm:w-18 md:w-24 h-14 sm:h-18 md:h-24 rounded-xl sm:rounded-2xl bg-forest-deep/90 backdrop-blur shadow-xl shadow-forest/30 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid place-items-center font-display text-2xl sm:text-3xl md:text-5xl font-semibold text-cream tabular-nums"
        >
          {value.toString().padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-cream/80">{label}</span>
  </div>
);

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(diff());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return <div className="h-20" aria-hidden />;

  return (
    <div
      className="flex items-start justify-center gap-2 sm:gap-3 md:gap-5 pb-6"
      aria-live="polite"
      aria-label={`Countdown: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`}
    >
      <Cell value={time.days} label="Days" />
      <Cell value={time.hours} label="Hours" />
      <Cell value={time.minutes} label="Min" />
      <Cell value={time.seconds} label="Sec" />
    </div>
  );
}
