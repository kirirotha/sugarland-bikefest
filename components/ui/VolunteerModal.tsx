"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, HandHelping, Megaphone, Wrench, ShieldCheck, Flag } from "lucide-react";
import Modal from "./Modal";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Valid email please"),
  interest: z.string().min(1, "Pick an area"),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const roles = [
  { Icon: Flag,        title: "Course Marshal",    body: "Keep racers safe and on-route." },
  { Icon: Wrench,      title: "Setup & Teardown",  body: "Build it Friday, break it down Sunday night." },
  { Icon: HandHelping, title: "Kids Zone Helper",  body: "Strider course, helmet fitting, sticker duty." },
  { Icon: Megaphone,   title: "Vendor Liaison",    body: "Help vendors check in and find their spot." },
  { Icon: ShieldCheck, title: "First Aid Support", body: "Coordinate with on-site medical team." },
];

type Props = { open: boolean; onClose: () => void };

export default function VolunteerModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "volunteer" }),
      });
    } catch { /* swallow */ }
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); reset(); }, 400);
  };

  return (
    <Modal open={open} onClose={handleClose} title="Get Involved" subtitle="A few hours of your time = a better festival for everyone." maxWidth="max-w-3xl">
      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center px-6 sm:px-8 py-12 sm:py-16">
          <CheckCircle2 size={52} className="text-forest mb-4" />
          <h3 className="font-display text-2xl font-semibold text-forest-deep">You&apos;re in.</h3>
          <p className="mt-2 text-ink/70 max-w-sm">Thanks! We&apos;ll reach out as we get closer to event weekend.</p>
          <button onClick={handleClose} className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-deep transition min-h-[44px]">
            Close
          </button>
        </div>
      ) : (
        <div className="grid gap-6 p-5 sm:p-6 sm:grid-cols-2">
          {/* Roles list */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Volunteer roles</p>
            {roles.map(({ Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white/60 backdrop-blur p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest text-cream shadow-md">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-ink">{title}</h4>
                  <p className="text-xs text-ink/60 mt-0.5">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sign-up form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Sign up to help</p>
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  {...register(id as "name" | "email")}
                  className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm min-h-[44px] focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
                />
                {errors[id as "name" | "email"] && (
                  <p className="mt-1 text-xs text-sunset-deep">{errors[id as "name" | "email"]?.message}</p>
                )}
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">Area of interest</label>
              <select
                {...register("interest")}
                defaultValue=""
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm min-h-[44px] focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
              >
                <option value="" disabled>Pick a role…</option>
                {roles.map((r) => <option key={r.title} value={r.title}>{r.title}</option>)}
                <option value="Sponsor / Vendor">Sponsor / Vendor inquiry</option>
                <option value="Wherever needed">Wherever needed</option>
              </select>
              {errors.interest && <p className="mt-1 text-xs text-sunset-deep">{errors.interest.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">Notes (optional)</label>
              <textarea
                rows={3}
                {...register("notes")}
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-sunset px-6 py-3.5 font-semibold text-white shadow-lg shadow-sunset/30 hover:bg-sunset-deep transition-all hover:-translate-y-0.5 disabled:opacity-50 min-h-[44px]"
            >
              {isSubmitting ? "Sending…" : "Count Me In"}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}
