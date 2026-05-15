"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Section from "./ui/Section";
import { faq } from "@/content/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Good questions."
      intro="Don't see yours? Reach out via the volunteer form above."
      accent="golden"
    >
      <ul className="space-y-3">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <li
              key={item.q}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-white/60 backdrop-blur"
            >
              <button
                className="flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left transition hover:bg-cream-warm/50 min-h-[44px]"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm sm:text-base text-forest-deep">{item.q}</span>
                <Plus
                  size={20}
                  className={`shrink-0 text-sunset transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-ink/70 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
