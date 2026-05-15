"use client";
import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import Modal from "./Modal";

type Props = { open: boolean; onClose: () => void };

export default function SubscribeModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch { /* swallow */ }
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setEmail(""); }, 400);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Stay in the Loop"
      subtitle="Be the first to hear about race registration, vendors, and event updates."
      maxWidth="max-w-md"
      allowBodyScroll
      fadeIn
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center px-5 py-10">
          <CheckCircle2 size={52} className="text-forest mb-4" />
          <h3 className="font-display text-2xl font-semibold text-forest-deep">You&apos;re on the list!</h3>
          <p className="mt-2 text-ink/70 max-w-sm">We&apos;ll be in touch as Sugar Land Bike Fest gets closer.</p>
          <button onClick={handleClose} className="mt-6 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white hover:bg-sunset-deep transition min-h-[44px]">
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">Email address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-ink/20 bg-white pl-10 pr-4 py-3 text-sm text-ink placeholder:text-ink/40 min-h-[44px] focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-sunset px-6 py-3.5 font-semibold text-white shadow-lg shadow-sunset/30 hover:bg-sunset-deep transition-all hover:-translate-y-0.5 disabled:opacity-50 min-h-[44px]"
          >
            {loading ? "Signing up…" : "Notify Me"}
          </button>
          <p className="text-center text-xs text-ink/40">No spam, ever. Unsubscribe anytime.</p>
        </form>
      )}
    </Modal>
  );
}
