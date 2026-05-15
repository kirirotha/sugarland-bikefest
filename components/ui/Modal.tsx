"use client";
import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: string;
  allowBodyScroll?: boolean;
  fadeIn?: boolean;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, subtitle, maxWidth = "max-w-5xl", allowBodyScroll = false, fadeIn = false, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) {
      document.addEventListener("keydown", onKey);
      panelRef.current?.scrollTo({ top: 0 });
      if (!allowBodyScroll) document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, allowBodyScroll]); // allowBodyScroll is stable — always included

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-2 sm:p-4 md:p-6"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 z-0 cursor-pointer bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        className={`relative z-[10] w-full ${maxWidth} max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-cream shadow-2xl shadow-black/30`}
        initial={{ y: fadeIn ? 0 : 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: fadeIn ? 0 : 60, opacity: 0 }}
        transition={fadeIn ? { duration: 0.3, ease: "easeOut" } : { type: "spring", bounce: 0.15, duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-start justify-between rounded-t-3xl bg-cream/95 backdrop-blur border-b border-ink/10 px-4 sm:px-6 md:px-8 py-4 sm:py-5">
          <div className="pr-3 min-w-0">
            <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-semibold text-forest-deep leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-xs sm:text-sm text-ink/60 leading-snug">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 grid h-10 w-10 place-items-center rounded-full border border-ink/20 bg-white hover:bg-cream transition min-h-[44px] min-w-[44px]"
          >
            <X size={18} className="text-ink" />
          </button>
        </div>

        {children}
      </motion.div>
    </div>,
    document.body
  );
}
