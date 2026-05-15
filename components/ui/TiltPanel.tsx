"use client";
import { useRef, useState, ReactNode, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  accent?: "sunset" | "golden" | "forest";
};

const accentBorder: Record<string, string> = {
  sunset: "from-transparent via-sunset/60 to-transparent",
  golden: "from-transparent via-golden/60 to-transparent",
  forest: "from-transparent via-forest/50 to-transparent",
};

export default function TiltPanel({
  children,
  className = "",
  maxTilt = 3,
  accent = "sunset",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 160, damping: 20, mass: 0.5 };
  const rawX = useSpring(0, springConfig);
  const rawY = useSpring(0, springConfig);

  const rotateY = useTransform(rawX, [-1, 1], [-maxTilt * 0.2, maxTilt * 0.2]);
  const rotateX = useTransform(rawY, [-1, 1], [maxTilt, -maxTilt]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      rawX.set(((e.clientX - left) / width) * 2 - 1);
      rawY.set(((e.clientY - top) / height) * 2 - 1);
    },
    [rawX, rawY]
  );

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative rounded-3xl transition-shadow duration-300 ${
          hovered
            ? "shadow-2xl shadow-black/40"
            : "shadow-lg shadow-black/25"
        } ${className}`}
      >
        {/* Dark frosted panel */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[#0e0c0a]/70 backdrop-blur-md" />
          {/* Top accent line */}
          <div
            className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r ${accentBorder[accent]} transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-40"
            }`}
          />
          {/* Subtle inner border */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative" style={{ transform: "translateZ(12px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
