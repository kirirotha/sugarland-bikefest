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
        <div className="rounded-3xl border border-ink/10 bg-cream-warm/70 backdrop-blur p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-forest text-cream shadow-lg shadow-forest/30">
                <HeartHandshake size={26} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-forest-deep">
                  Join the crew
                </h3>
                <p className="mt-1 text-ink/70 max-w-md">
                  Course marshals, kids zone helpers, setup crew, vendor liaisons, and more.
                  Pick a role that fits — we&apos;ll handle the rest.
                </p>
              </div>
            </div>
            <button
              onClick={() => openWithScroll("volunteer", () => setModalOpen(true))}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-sm text-cream shadow-lg shadow-forest/30 hover:bg-forest-deep transition-all hover:-translate-y-0.5"
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
