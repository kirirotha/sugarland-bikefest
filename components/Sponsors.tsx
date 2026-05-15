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
        <div className="rounded-3xl border border-ink/10 bg-cream-warm/70 backdrop-blur p-8 sm:p-10 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sunset text-white shadow-lg shadow-sunset/30">
                <Megaphone size={26} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-forest-deep">
                  Become a sponsor
                </h3>
                <p className="mt-1 text-ink/70 max-w-md">
                  Multiple tiers available — from title naming rights to community-level in-kind support.
                  Custom packages welcome.
                </p>
              </div>
            </div>
            <button
              onClick={() => openWithScroll("sponsors", () => setModalOpen(true))}
              className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 font-semibold text-sm text-white shadow-lg shadow-sunset/30 hover:bg-sunset-deep transition-all hover:-translate-y-0.5"
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
