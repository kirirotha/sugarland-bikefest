"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, CheckCircle2, Download, LogOut, ArrowLeft,
  ArrowUp, ArrowDown, ArrowUpDown, RefreshCw,
} from "lucide-react";
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

type WaiverRow = {
  id: string;
  confirmationCode: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  dob: string;
  isMinor: boolean;
  guardianName: string | null;
  emergencyContactName: string;
  emergencyContactPhone: string;
  signedBy: string;
  waiverVersion: string;
  createdAt: string;
};

type SortKey = "participantName" | "dob" | "isMinor" | "createdAt" | "confirmationCode";

const columns: { key: SortKey; label: string }[] = [
  { key: "participantName", label: "Participant" },
  { key: "dob", label: "DOB" },
  { key: "isMinor", label: "Status" },
  { key: "createdAt", label: "Signed" },
  { key: "confirmationCode", label: "Code" },
];

export default function StaffVerifyPage() {
  const router = useRouter();

  // Quick race-day lookup (unchanged) — a single name/code search.
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  // Full sortable/filterable table of every signed waiver.
  const [all, setAll] = useState<WaiverRow[]>([]);
  const [allLoading, setAllLoading] = useState(true);
  const [allError, setAllError] = useState("");
  const [tableFilter, setTableFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const loadAll = async () => {
    setAllLoading(true);
    setAllError("");
    try {
      const res = await fetch("/api/staff/waivers");
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load");
      setAll(json.waivers || []);
    } catch {
      setAllError("Couldn't load waivers. Try refreshing.");
    }
    setAllLoading(false);
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "createdAt" ? "desc" : "asc");
    }
  };

  const filteredSorted = useMemo(() => {
    const needle = tableFilter.trim().toLowerCase();
    const filtered = needle
      ? all.filter(
          (w) =>
            w.participantName.toLowerCase().includes(needle) ||
            w.confirmationCode.toLowerCase().includes(needle) ||
            (w.guardianName?.toLowerCase().includes(needle) ?? false)
        )
      : all;

    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "isMinor":
          cmp = Number(a.isMinor) - Number(b.isMinor);
          break;
        case "participantName":
          cmp = a.participantName.localeCompare(b.participantName);
          break;
        default:
          cmp = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [all, tableFilter, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (col !== sortKey) return <ArrowUpDown size={12} className="text-cream/30" />;
    return sortDir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-32 pb-24">
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

      {/* Quick race-day lookup */}
      <div className="max-w-xl mb-12">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={q}
            onChange={(e) => runSearch(e.target.value)}
            placeholder="Quick check-in: search by name or confirmation code…"
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

      {/* Full sortable/filterable table */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 className="font-display text-xl font-semibold text-cream">
          All Waivers <span className="text-cream/40 text-base font-normal">({filteredSorted.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40 pointer-events-none" />
            <input
              type="text"
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              placeholder="Filter table…"
              className="rounded-lg border border-cream/20 bg-ink/40 pl-8 pr-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/20"
            />
          </div>
          <button
            onClick={loadAll}
            disabled={allLoading}
            aria-label="Refresh"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-cream/20 text-cream/70 hover:bg-cream/10 hover:text-cream transition disabled:opacity-50"
          >
            <RefreshCw size={15} className={allLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {allError && <p className="text-sm text-sunset mb-4">{allError}</p>}

      {allLoading && all.length === 0 ? (
        <p className="text-sm text-cream/50">Loading waivers…</p>
      ) : filteredSorted.length === 0 ? (
        <p className="text-sm text-cream/60">
          {all.length === 0 ? "No waivers signed yet." : "No rows match that filter."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-cream/10">
          <table className="w-full text-sm text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-cream/10 bg-ink/40">
                {columns.map((col) => (
                  <th key={col.key} className="p-0">
                    <button
                      onClick={() => toggleSort(col.key)}
                      className="w-full flex items-center gap-1.5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-cream/60 hover:text-cream transition"
                    >
                      {col.label} <SortIcon col={col.key} />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSorted.map((w) => (
                <tr key={w.id} className="border-b border-cream/5 last:border-0 hover:bg-cream/5 transition">
                  <td className="px-4 py-3 text-cream font-medium whitespace-nowrap">{w.participantName}</td>
                  <td className="px-4 py-3 text-cream/70 whitespace-nowrap">{formatDateOnly(w.dob)}</td>
                  <td className="px-4 py-3 text-cream/70 whitespace-nowrap">
                    {w.isMinor ? (
                      <span className="inline-flex items-center rounded-full bg-golden/15 text-golden px-2 py-0.5 text-xs font-semibold">
                        Minor{w.guardianName ? ` · ${w.guardianName}` : ""}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-forest/30 text-cream/80 px-2 py-0.5 text-xs font-semibold">
                        Adult
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-cream/60 whitespace-nowrap">
                    {new Date(w.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-cream/60 font-mono text-xs whitespace-nowrap">
                    {w.confirmationCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
