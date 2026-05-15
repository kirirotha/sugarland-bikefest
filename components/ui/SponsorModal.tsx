"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import Modal from "./Modal";
import { tiers } from "@/content/sponsors";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Valid email please"),
  company: z.string().optional(),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

type Props = { open: boolean; onClose: () => void };

export default function SponsorModal({ open, onClose }: Props) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tier: selectedTier, source: "sponsor" }),
      });
    } catch { /* swallow */ }
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSelectedTier(null); setSubmitted(false); reset(); }, 400);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={selectedTier ? `${selectedTier} — Inquiry` : "Sponsorship Packages"}
      subtitle={selectedTier ? "Fill out your details and we'll be in touch soon." : "All tiers include recognition on-site, online, and across our cycling community network."}
      fadeIn
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center px-5 sm:px-8 py-10 sm:py-16">
          <CheckCircle2 size={52} className="text-forest mb-4" />
          <h3 className="font-display text-2xl font-semibold text-forest-deep">Got it!</h3>
          <p className="mt-2 text-ink/70 max-w-sm">Thanks for your interest in sponsoring Sugar Land Bike Fest. We&apos;ll reach out shortly.</p>
          <button onClick={handleClose} className="mt-6 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white hover:bg-sunset-deep transition min-h-[44px]">
            Close
          </button>
        </div>
      ) : selectedTier ? (
        <div className="p-4 sm:p-6 max-w-md mx-auto">
          <button
            onClick={() => { setSelectedTier(null); reset(); }}
            className="mb-5 inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink transition"
          >
            <ArrowLeft size={14} /> Back to tiers
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { id: "name",    label: "Name",            type: "text",  placeholder: "Your name" },
              { id: "email",   label: "Email",           type: "email", placeholder: "you@example.com" },
              { id: "company", label: "Company (optional)", type: "text", placeholder: "Your business or brand" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  {...register(id as "name" | "email" | "company")}
                  className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 min-h-[44px] focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
                />
                {errors[id as "name" | "email"] && (
                  <p className="mt-1 text-xs text-sunset-deep">{errors[id as "name" | "email"]?.message}</p>
                )}
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">Notes (optional)</label>
              <textarea
                rows={3}
                placeholder="Any questions or special requests?"
                {...register("notes")}
                className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-sunset px-6 py-3.5 font-semibold text-white shadow-lg shadow-sunset/30 hover:bg-sunset-deep transition-all hover:-translate-y-0.5 disabled:opacity-50 min-h-[44px]"
            >
              {isSubmitting ? "Sending…" : "Send Inquiry"}
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="mx-4 sm:mx-6 mt-5 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 rounded-2xl border border-golden/40 bg-golden/10 px-4 py-3 text-sm text-ink/70">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="shrink-0 text-golden" />
              <span>Packages being finalized — reach out early to lock in your tier.</span>
            </div>
            <button
              onClick={() => setSelectedTier("General Inquiry")}
              className="w-full sm:w-auto rounded-full bg-sunset px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sunset/30 hover:bg-sunset-deep transition-all hover:-translate-y-0.5 min-h-[44px] text-center"
            >
              I&apos;m Interested
            </button>
          </div>

          <div className="grid gap-4 p-4 sm:p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                <div className="select-none blur-sm pointer-events-none">
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
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-ink/10 px-6 sm:px-8 py-5 text-sm text-ink/60">
            Full details coming soon. Custom packages available — contact us to discuss a tailored sponsorship for your brand.
          </div>
        </>
      )}
    </Modal>
  );
}
