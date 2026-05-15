"use client";
import { useState } from "react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import ResultsModal from "./ui/ResultsModal";
import { Trophy, ArrowRight, Clock } from "lucide-react";
import { results } from "@/content/results";

function openWithScroll(id: string, open: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(open, 500);
}

export default function Results() {
  const [modalOpen, setModalOpen] = useState(false);
  const hasResults = results.length > 0;

  return (
    <Section
      id="results"
      eyebrow="Race Results"
      title={hasResults ? "Official Results" : "Results Posted After Race Weekend"}
      accent="golden"
    >
      <Reveal>
        <div className="rounded-3xl border border-ink/10 bg-cream-warm/70 backdrop-blur p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-golden to-sunset text-white shadow-lg shadow-sunset/30">
                {hasResults ? <Trophy size={26} /> : <Clock size={26} />}
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-forest-deep">
                  {hasResults ? "View podium finishers" : "Check back Oct 24–25"}
                </h3>
                <p className="mt-1 text-ink/70 max-w-md">
                  {hasResults
                    ? "Official results for all race categories — MTB Time Trial, Pump Track, and more."
                    : "MTB Time Trial, Pump Track, and Kids Bracket results will be posted here as each race finishes."}
                </p>
              </div>
            </div>
            <button
              onClick={() => openWithScroll("results", () => setModalOpen(true))}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-golden to-sunset px-6 py-3 font-semibold text-sm text-white shadow-lg shadow-sunset/30 hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              {hasResults ? "See Full Results" : "Preview Race Categories"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Reveal>

      <ResultsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Section>
  );
}
