"use client";
import { Check, Sparkles } from "lucide-react";
import Modal from "./Modal";
import { tiers } from "@/content/sponsors";

type Props = { open: boolean; onClose: () => void };

export default function SponsorModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Sponsorship Packages"
      subtitle="All tiers include recognition on-site, online, and across our cycling community network."
    >
      <div className="grid gap-4 p-5 sm:p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-2xl p-4 border transition-all ${
              t.highlight
                ? "bg-gradient-to-br from-forest-deep to-forest text-cream border-transparent shadow-xl shadow-forest/30"
                : "bg-white text-ink border-ink/10 shadow-sm"
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-sunset px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-sunset/40">
                <Sparkles size={11} /> Best Value
              </span>
            )}
            <h3 className={`font-display text-lg font-semibold ${t.highlight ? "text-cream" : "text-forest-deep"}`}>
              {t.name}
            </h3>
            <p className={`mt-0.5 font-display text-2xl font-semibold ${t.highlight ? "text-golden" : "text-sunset"}`}>
              {t.price}
            </p>
            <ul className={`mt-4 flex-1 space-y-2 text-sm ${t.highlight ? "text-cream/90" : "text-ink/75"}`}>
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check size={14} className={`mt-0.5 shrink-0 ${t.highlight ? "text-golden" : "text-sunset"}`} />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="#volunteer"
              onClick={onClose}
              className={`mt-5 block w-full rounded-full py-3 text-center text-sm font-semibold transition min-h-[44px] ${
                t.highlight
                  ? "bg-sunset text-white hover:bg-sunset-deep shadow-md shadow-sunset/30"
                  : "bg-forest/10 text-forest-deep hover:bg-forest/20"
              }`}
            >
              I&apos;m interested
            </a>
          </div>
        ))}
      </div>

      <div className="border-t border-ink/10 px-6 sm:px-8 py-5 text-sm text-ink/60">
        Custom packages available — contact us to discuss a tailored sponsorship for your brand.
      </div>
    </Modal>
  );
}
