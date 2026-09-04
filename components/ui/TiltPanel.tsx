"use client";
import {
  useRef,
  useState,
  useEffect,
  useSyncExternalStore,
  ReactNode,
  useCallback,
} from "react";
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

type OrientationEventInit = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

let orientationPermissionRequested = false;

function subscribeCoarsePointer(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

function getCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

function ensureOrientationPermission() {
  if (typeof window === "undefined") return;
  if (orientationPermissionRequested) return;
  const ctor = window.DeviceOrientationEvent as OrientationEventInit | undefined;
  if (!ctor || typeof ctor.requestPermission !== "function") return;
  orientationPermissionRequested = true;
  const trigger = () => {
    ctor.requestPermission?.().catch(() => {});
    window.removeEventListener("touchend", trigger);
    window.removeEventListener("click", trigger);
  };
  window.addEventListener("touchend", trigger, { once: true });
  window.addEventListener("click", trigger, { once: true });
}

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

  const isCoarse = useSyncExternalStore(
    subscribeCoarsePointer,
    getCoarsePointer,
    () => false
  );

  useEffect(() => {
    if (!isCoarse) return;
    ensureOrientationPermission();

    let frame = 0;
    let pendingX = 0;
    let pendingY = 0;
    let hasPending = false;

    const flush = () => {
      frame = 0;
      if (!hasPending) return;
      hasPending = false;
      rawX.set(pendingX);
      rawY.set(pendingY);
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      pendingX = Math.max(-1, Math.min(1, gamma / 30));
      pendingY = Math.max(-1, Math.min(1, (beta - 45) / 30));
      hasPending = true;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener("deviceorientation", onOrient);
    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      if (frame) cancelAnimationFrame(frame);
      rawX.set(0);
      rawY.set(0);
    };
  }, [isCoarse, rawX, rawY]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isCoarse) return;
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      rawX.set(((e.clientX - left) / width) * 2 - 1);
      rawY.set(((e.clientY - top) / height) * 2 - 1);
    },
    [rawX, rawY, isCoarse]
  );

  const onMouseLeave = useCallback(() => {
    if (isCoarse) return;
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY, isCoarse]);

  const onMouseEnter = useCallback(() => {
    if (isCoarse) return;
    setHovered(true);
  }, [isCoarse]);

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY }}
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
        <div className="relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
