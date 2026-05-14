"use client";
import { useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: string;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, subtitle, maxWidth = "max-w-5xl", children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) {
      document.addEventListener("keydown", onKey);
      panelRef.current?.scrollTo({ top: 0 });
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 pt-16 sm:pt-20"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Backdrop — clicks here close the modal */}
      <div
        className="absolute inset-0 bg-forest-deep/70 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        className={`relative z-10 w-full ${maxWidth} max-h-[90vh] sm:max-h-[82vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-cream shadow-2xl shadow-black/30`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle on mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-ink/20" />
        </div>

        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-start justify-between rounded-t-3xl bg-cream/95 backdrop-blur border-b border-ink/10 px-5 sm:px-8 py-4 sm:py-5">
          <div className="pr-4 min-w-0">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-forest-deep leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-xs sm:text-sm text-ink/60">{subtitle}</p>
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
    </div>
  );
}
