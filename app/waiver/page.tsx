"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, PenLine } from "lucide-react";
import { waiverSchema, type WaiverInput, isMinorOnEventDate } from "@/lib/waiver";
import { WAIVER_TITLE, WAIVER_TEXT, WAIVER_VERSION } from "@/content/waiver";

const inputCls =
  "w-full rounded-xl border border-cream/20 bg-ink/40 px-4 py-3 text-sm text-cream placeholder:text-cream/40 min-h-[44px] focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20";
const labelCls = "block text-xs font-semibold uppercase tracking-wider text-cream/60 mb-1";
const errCls = "mt-1 text-xs text-sunset";

function Field({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: ReturnType<typeof useForm<WaiverInput>>["register"];
  error?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...register(id as any)}
        className={inputCls}
      />
      {error && <p className={errCls}>{error}</p>}
    </div>
  );
}

export default function WaiverPage() {
  const [submitted, setSubmitted] = useState<{ code: string } | null>(null);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WaiverInput>({ resolver: zodResolver(waiverSchema) });

  const dob = watch("dob");
  const minor = dob && !Number.isNaN(Date.parse(dob)) ? isMinorOnEventDate(new Date(dob)) : false;

  const onSubmit = async (data: WaiverInput) => {
    setServerError("");
    try {
      const res = await fetch("/api/waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted({ code: json.confirmationCode });
    } catch {
      setServerError("Network error — please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-32 pb-24 text-center">
        <CheckCircle2 size={56} className="text-forest mx-auto mb-5" />
        <h1 className="font-display text-3xl font-semibold text-cream mb-3">Waiver Signed</h1>
        <p className="text-cream/70 mb-6">
          A confirmation email is on its way. Save your confirmation code below — bring it (or
          just your name) to check-in on race day.
        </p>
        <div className="inline-block rounded-2xl border border-golden/40 bg-golden/10 px-8 py-4">
          <p className="text-xs uppercase tracking-wider text-golden/80 mb-1">Confirmation code</p>
          <p className="font-display text-2xl font-semibold text-golden tracking-widest">{submitted.code}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-32 pb-24">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-golden mb-3">Race Weekend</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cream leading-tight mb-4">
          Sign Your Waiver
        </h1>
        <p className="text-cream/70 max-w-xl">
          Every participant in a Sugar Land Bike Fest race event must sign a liability waiver.
          Riders under 18 need a parent or legal guardian to sign on their behalf. This takes
          about two minutes — you&apos;ll get a confirmation code to bring to check-in.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Participant */}
        <section className="rounded-2xl border border-cream/10 bg-ink/30 backdrop-blur-md p-5 sm:p-6 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">Participant</p>
          <Field id="participantName" label="Full legal name" placeholder="Jane Rider" register={register} error={errors.participantName?.message} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field id="participantEmail" label="Email" type="email" placeholder="jane@example.com" register={register} error={errors.participantEmail?.message} />
            <Field id="participantPhone" label="Phone" type="tel" placeholder="(555) 555-1234" register={register} error={errors.participantPhone?.message} />
          </div>
          <div>
            <label className={labelCls}>Date of birth</label>
            <input type="date" {...register("dob")} className={inputCls} />
            {errors.dob && <p className={errCls}>{errors.dob.message}</p>}
            {minor && (
              <p className="mt-2 text-xs text-golden">
                This participant will be under 18 on event day — a parent/legal guardian must complete the section below and sign.
              </p>
            )}
          </div>
        </section>

        {/* Guardian — only shown once DOB indicates a minor */}
        {minor && (
          <section className="rounded-2xl border border-golden/30 bg-golden/5 backdrop-blur-md p-5 sm:p-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-golden/90">Parent / Legal Guardian</p>
            <Field id="guardianName" label="Guardian full legal name" placeholder="Alex Rider" register={register} error={errors.guardianName?.message} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field id="guardianEmail" label="Guardian email" type="email" placeholder="alex@example.com" register={register} error={errors.guardianEmail?.message} />
              <Field id="guardianPhone" label="Guardian phone" type="tel" placeholder="(555) 555-1234" register={register} error={errors.guardianPhone?.message} />
            </div>
          </section>
        )}

        {/* Emergency contact */}
        <section className="rounded-2xl border border-cream/10 bg-ink/30 backdrop-blur-md p-5 sm:p-6 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">Emergency Contact</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field id="emergencyContactName" label="Name" placeholder="Contact name" register={register} error={errors.emergencyContactName?.message} />
            <Field id="emergencyContactPhone" label="Phone" type="tel" placeholder="(555) 555-1234" register={register} error={errors.emergencyContactPhone?.message} />
          </div>
        </section>

        {/* Waiver text */}
        <section className="rounded-2xl border border-cream/10 bg-ink/30 backdrop-blur-md p-5 sm:p-6 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">{WAIVER_TITLE}</p>
          <div className="max-h-64 overflow-y-auto rounded-xl border border-cream/10 bg-ink/50 p-4 text-xs leading-relaxed text-cream/70 whitespace-pre-line">
            {WAIVER_TEXT}
          </div>
          <p className="text-[11px] text-cream/40">Version {WAIVER_VERSION}</p>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" {...register("agreedToTerms")} className="mt-1 h-4 w-4 accent-sunset" />
            <span className="text-sm text-cream/80">
              I have read and agree to the waiver above{minor ? ", on behalf of the minor participant named" : ""}.
            </span>
          </label>
          {errors.agreedToTerms && <p className={errCls}>{errors.agreedToTerms.message}</p>}

          <div>
            <label className={labelCls}>
              <span className="inline-flex items-center gap-1.5">
                <PenLine size={13} /> Type your full legal name to sign{minor ? " (guardian)" : ""}
              </span>
            </label>
            <input
              type="text"
              placeholder="Type full legal name"
              {...register("signatureName")}
              className={`${inputCls} font-display text-lg`}
            />
            {errors.signatureName && <p className={errCls}>{errors.signatureName.message}</p>}
          </div>
        </section>

        {serverError && <p className="text-sm text-sunset text-center">{serverError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-sunset px-6 py-4 font-semibold text-white shadow-lg shadow-sunset/30 hover:bg-sunset-deep transition-all hover:-translate-y-0.5 disabled:opacity-50 min-h-[48px]"
        >
          {isSubmitting ? "Submitting…" : "Sign Waiver"}
        </button>
      </form>
    </div>
  );
}
