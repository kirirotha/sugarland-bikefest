"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, CheckCircle2, Download, LogOut, ArrowLeft } from "lucide-react";
import { formatDateOnly } from "@/lib/waiver";

type Result = {
  id: string;
  participantName: string;
  dob: string;
  isMinor: boolean;
  guardianName: string | null;
  signedBy: string;
  confirmationCode: string;
  createdAt: string;
};

export default function StaffVerifyPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/staff/logout", { method: "POST" });
    } catch { /* clear locally regardless */ }
    router.push("/staff/login");
    router.refresh();
  };

  const runSearch = async (value: string) => {
    setQ(value);
    if (value.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/staff/search?q=${encodeURIComponent(value.trim())}`);
      const json = await res.json();
      setResults(json.results || []);
    } catch {
      setResults([]);
    }
    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-32 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-cream/60 hover:text-golden transition mb-6"
      >
        <ArrowLeft size={14} /> Back to site
      </Link>

      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-golden mb-2">Staff</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-cream">
            Waiver Check-In
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/staff/export"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream hover:bg-forest-deep transition"
          >
            <Download size={16} /> Export CSV
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-5 py-2.5 text-sm font-semibold text-cream/80 hover:bg-cream/10 hover:text-cream transition disabled:opacity-50"
          >
            <LogOut size={16} /> {loggingOut ? "Logging out…" : "Log Out"}
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40 pointer-events-none" />
        <input
          type="text"
          autoFocus
          value={q}
          onChange={(e) => runSearch(e.target.value)}
          placeholder="Search by participant name or confirmation code…"
          className="w-full rounded-xl border border-cream/20 bg-ink/40 backdrop-blur-md pl-11 pr-4 py-3.5 text-cream placeholder:text-cream/40 min-h-[48px] focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
        />
      </div>

      {loading && <p className="text-sm text-cream/50">Searching…</p>}

      {!loading && searched && results.length === 0 && (
        <p className="text-sm text-cream/60">No signed waiver found for &ldquo;{q}&rdquo;.</p>
      )}

      <ul className="space-y-3">
        {results.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-cream/10 bg-ink/40 backdrop-blur-md p-4 flex items-start gap-3"
          >
            <CheckCircle2 size={20} className="text-forest shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-semibold text-cream">{r.participantName}</p>
              <p className="text-sm text-cream/60">
                DOB {formatDateOnly(r.dob)} ·{" "}
                {r.isMinor ? `Minor — guardian: ${r.guardianName}` : "Adult"}
              </p>
              <p className="text-xs text-cream/40 mt-1">
                Code {r.confirmationCode} · Signed {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
