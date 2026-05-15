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
        <div className="rounded-2xl sm:rounded-3xl border border-ink/10 bg-cream-warm/70 backdrop-blur p-5 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-golden to-sunset text-white shadow-lg shadow-sunset/30">
                {hasResults ? <Trophy size={24} /> : <Clock size={24} />}
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-forest-deep">
                  {hasResults ? "View podium finishers" : "Check back Oct 24–25"}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-ink/70 max-w-md">
                  {hasResults
                    ? "Official results for all race categories — MTB Time Trial, Pump Track, and more."
                    : "MTB Time Trial, Pump Track, and Kids Bracket results will be posted here as each race finishes."}
                </p>
              </div>
            </div>
            <button
              onClick={() => openWithScroll("results", () => setModalOpen(true))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-golden to-sunset px-6 py-3 font-semibold text-sm text-white shadow-lg shadow-sunset/30 hover:opacity-90 transition-all hover:-translate-y-0.5 min-h-[44px]"
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
