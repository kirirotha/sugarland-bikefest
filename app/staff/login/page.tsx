"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";

function StaffLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/staff/verify";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 pt-32 pb-24">
      <div className="rounded-2xl border border-cream/10 bg-ink/40 backdrop-blur-md p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={18} className="text-golden" />
          <h1 className="font-display text-xl font-semibold text-cream">Staff Login</h1>
        </div>
        <p className="text-sm text-cream/60 mb-6">
          Race-day check-in and waiver records — FBMBA volunteers only.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Staff password"
            className="w-full rounded-xl border border-cream/20 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-cream/40 min-h-[44px] focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
          />
          {error && <p className="text-sm text-sunset">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-sunset px-6 py-3.5 font-semibold text-white shadow-lg shadow-sunset/30 hover:bg-sunset-deep transition-all disabled:opacity-50 min-h-[44px]"
          >
            {loading ? "Checking…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function StaffLoginPage() {
  return (
    <Suspense>
      <StaffLoginForm />
    </Suspense>
  );
}
