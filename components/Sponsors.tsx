"use client";
import { useState } from "react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SponsorModal from "./ui/SponsorModal";
import { Megaphone, ArrowRight } from "lucide-react";

function openWithScroll(id: string, open: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(open, 500);
}

export default function Sponsors() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Section
      id="sponsors"
      eyebrow="Sponsors & Vendors"
      title="Put your brand on the start line."
      intro="Reach thousands of cyclists, families, and outdoor enthusiasts across the Greater Houston region. Sponsorship dollars fund FBMBA trail and pump track improvements."
      accent="sunset"
    >
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
