"use client";
import { useState } from "react";
import { Trophy, Medal } from "lucide-react";
import Modal from "./Modal";
import { results } from "@/content/results";

type Props = { open: boolean; onClose: () => void };

const placeStyle: Record<number, string> = {
  1: "bg-golden text-forest-deep font-bold",
  2: "bg-ink/10 text-ink font-semibold",
  3: "bg-sunset/15 text-sunset-deep font-semibold",
};

export default function ResultsModal({ open, onClose }: Props) {
  const [activeRace, setActiveRace] = useState(0);
  const hasResults = results.length > 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Race Results"
      subtitle={hasResults ? "Official results — Sugar Land Bike Fest 2026" : "Results will be posted here after race weekend."}
      maxWidth="max-w-3xl"
    >
      {!hasResults ? (
        <div className="flex flex-col items-center justify-center text-center px-8 py-16">
          <div className="relative mb-6">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-golden/30 to-sunset/20">
              <Trophy size={44} className="text-golden" />
            </div>
            <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-forest text-cream text-xs font-bold shadow-md">
              ?
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-forest-deep">
            Results Coming Oct 24–25
          </h3>
          <p className="mt-2 text-ink/60 max-w-sm">
            Official podium results for all race categories will be posted here as soon
            as each event wraps. Check back during the weekend for live updates.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-ink/50">
            {["MTB Time Trial", "Pump Track Race"].map((r) => (
              <span key={r} className="rounded-full border border-ink/10 bg-cream-warm px-3 py-1">
                {r}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-6">
          {/* Race tabs */}
          {results.length > 1 && (
            <div className="mb-5 flex gap-2 flex-wrap">
              {results.map((r, i) => (
                <button
                  key={r.race}
                  onClick={() => setActiveRace(i)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    activeRace === i
                      ? "bg-sunset text-white shadow-md shadow-sunset/30"
                      : "bg-cream-warm text-ink/70 hover:text-ink border border-ink/10"
                  }`}
                >
                  {r.race}
                </button>
              ))}
            </div>
          )}

          {results[activeRace]?.categories.map((cat) => (
            <div key={cat.category} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Medal size={16} className="text-sunset" />
                <h4 className="font-semibold text-forest-deep">{cat.category}</h4>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-ink/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 bg-cream-warm/70 text-left">
                      <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink/50 w-12">Place</th>
                      <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink/50">Rider</th>
                      <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink/50 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/8 bg-white/60">
                    {cat.entries.map((e) => (
                      <tr key={e.place} className="hover:bg-cream-warm/40 transition">
                        <td className="px-4 py-3">
                          <span className={`inline-grid h-7 w-7 place-items-center rounded-full text-xs ${placeStyle[e.place] ?? "bg-ink/5 text-ink/60"}`}>
                            {e.place}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-ink">{e.name}</span>
                          {e.hometown && (
                            <span className="ml-2 text-xs text-ink/45">{e.hometown}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right font-display font-semibold text-forest-deep tabular-nums">
                          {e.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
