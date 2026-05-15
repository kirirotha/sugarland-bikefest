"use client";
import { useState } from "react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import VolunteerModal from "./ui/VolunteerModal";
import { ArrowRight, HeartHandshake } from "lucide-react";

function openWithScroll(id: string, open: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(open, 500);
}

export default function Volunteer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Section
      id="volunteer"
      eyebrow="Get Involved"
      title="Volunteers make this weekend possible."
      intro="A few hours of your time = a better festival for everyone."
      accent="forest"
    >
      <Reveal>
        <div className="rounded-2xl sm:rounded-3xl border border-ink/10 bg-cream-warm/70 backdrop-blur p-5 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-2xl bg-forest text-cream shadow-lg shadow-forest/30">
                <HeartHandshake size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-forest-deep">
                  Join the crew
                </h3>
                <p className="mt-1 text-sm sm:text-base text-ink/70 max-w-md">
                  Course marshals, kids zone helpers, setup crew, vendor liaisons, and more.
                  Pick a role that fits — we&apos;ll handle the rest.
                </p>
              </div>
            </div>
            <button
              onClick={() => openWithScroll("volunteer", () => setModalOpen(true))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-sm text-cream shadow-lg shadow-forest/30 hover:bg-forest-deep transition-all hover:-translate-y-0.5 min-h-[44px]"
            >
              See Roles &amp; Sign Up <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Reveal>

      <VolunteerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Section>
  );
}
