"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Bike, Baby, Store, Music, Sparkles } from "lucide-react";
import Section from "./ui/Section";
import { schedule, type ScheduleItem } from "@/content/schedule";

const tagIcon = { race: Trophy, ride: Bike, kids: Baby, village: Store, ceremony: Music, social: Sparkles } as const;
const tagLabel = { race: "Race", ride: "Ride", kids: "Kids", village: "Village", ceremony: "Ceremony", social: "Social" } as const;

const tagChip: Record<ScheduleItem["tag"], string> = {
  race:     "bg-sunset text-white",
  ride:     "bg-forest text-cream",
  kids:     "bg-golden text-forest-deep",
  village:  "bg-cream-warm text-ink border border-ink/15",
  ceremony: "bg-forest-deep text-cream",
  social:   "bg-golden/80 text-forest-deep",
};

const tagBorder: Record<ScheduleItem["tag"], string> = {
  race:     "border-l-sunset",
  ride:     "border-l-forest",
  kids:     "border-l-golden",
  village:  "border-l-ink/30",
  ceremony: "border-l-forest-deep",
  social:   "border-l-golden",
};

function groupByTime(items: ScheduleItem[]): Map<number, ScheduleItem[]> {
  const map = new Map<number, ScheduleItem[]>();
  for (const item of items) {
    const bucket = map.get(item.startMin) ?? [];
    bucket.push(item);
    map.set(item.startMin, bucket);
  }
  return new Map([...map.entries()].sort((a, b) => a[0] - b[0]));
}

function EventCard({ item }: { item: ScheduleItem }) {
  const Icon = tagIcon[item.tag];
  return (
    <div className={`flex flex-col gap-2 rounded-2xl border border-l-4 ${tagBorder[item.tag]} border-ink/10 bg-white/70 backdrop-blur px-3 py-3 sm:px-3 sm:py-2`}>
      <div className="flex items-center gap-2">
        <div className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${tagChip[item.tag]}`}>
          <Icon size={13} />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">
          {tagLabel[item.tag]} · ~{item.durationMin}m
        </span>
      </div>
      <div>
        <p className="font-semibold text-sm text-ink leading-snug">{item.title}</p>
        <p className="mt-0.5 text-xs text-ink/60 leading-snug">{item.blurb}</p>
      </div>
    </div>
  );
}

/* ── Mobile: stacked list ── */
function MobileSchedule({ items }: { items: ScheduleItem[] }) {
  const grouped = groupByTime(items);
  return (
    <div className="space-y-4">
      {[...grouped.entries()].map(([startMin, slotItems]) => (
        <div key={startMin}>
          <p className="mb-2 font-display text-sm font-semibold text-forest-deep">
            {slotItems[0].time}
          </p>
          <div className="space-y-2 pl-3 border-l-2 border-sunset/30">
            {slotItems.map((item) => (
              <EventCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Desktop: grid with tooltip pills ── */
function TooltipPill({
  item,
  pillId,
  activeId,
  setActiveId,
}: {
  item: ScheduleItem;
  pillId: string;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = tagIcon[item.tag];
  const tapped = activeId === pillId;
  const show = hovered || tapped;
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setActiveId(tapped ? null : pillId);
        }}
        className={`w-full text-left flex items-center gap-2 rounded-xl border border-l-4 ${tagBorder[item.tag]} border-ink/10 bg-white/70 backdrop-blur px-3 py-2 text-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-forest/10 hover:bg-white focus:outline-none focus:ring-2 focus:ring-sunset/30`}
        aria-label={`${item.title} — ${item.blurb}`}
        aria-expanded={tapped}
      >
        <div className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${tagChip[item.tag]}`}>
          <Icon size={12} />
        </div>
        <span className="truncate font-medium text-ink text-xs">{item.title}</span>
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-2xl border border-ink/10 bg-white/95 backdrop-blur shadow-xl shadow-forest/15 p-3"
          >
            <div className="absolute top-full left-1/2 -translate-x-1/2 h-0 w-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-white/95" />
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${tagChip[item.tag]}`}>
                <Icon size={13} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                {tagLabel[item.tag]} · ~{item.durationMin}m
              </span>
            </div>
            <p className="font-semibold text-sm text-ink leading-snug">{item.title}</p>
            <p className="mt-1 text-xs text-ink/60 leading-snug">{item.blurb}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopSchedule({ items }: { items: ScheduleItem[] }) {
  const grouped = groupByTime(items);
  const trackCount = Math.max(...items.map((i) => i.track)) + 1;
  const [activeId, setActiveId] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeId) return;
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setActiveId(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [activeId]);

  return (
    <div ref={wrapRef}>
      {trackCount > 1 && (
        <div className="mb-2 grid gap-2" style={{ gridTemplateColumns: `4.5rem repeat(${trackCount}, 1fr)` }}>
          <div />
          {Array.from({ length: trackCount }, (_, t) => (
            <div key={t} className="text-[11px] font-semibold uppercase tracking-wider text-ink/40 pl-1">
              Track {t + 1}
            </div>
          ))}
        </div>
      )}
      <div className="space-y-1.5">
        {[...grouped.entries()].map(([startMin, slotItems]) => {
          const row: (ScheduleItem | null)[] = Array(trackCount).fill(null);
          for (const item of slotItems) row[item.track] = item;
          return (
            <div key={startMin} className="grid gap-2 items-center" style={{ gridTemplateColumns: `4.5rem repeat(${trackCount}, 1fr)` }}>
              <div className="text-right pr-3">
                <span className="font-display text-sm font-semibold text-golden tabular-nums">{slotItems[0].time.split(" ")[0]}</span>
                <span className="block text-[10px] text-cream/50 uppercase tracking-wide leading-none">{slotItems[0].time.split(" ")[1]}</span>
              </div>
              {row.map((item, trackIdx) =>
                item
                  ? <TooltipPill key={trackIdx} item={item} pillId={`${startMin}-${trackIdx}`} activeId={activeId} setActiveId={setActiveId} />
                  : <div key={trackIdx} className="h-9 rounded-xl border border-dashed border-ink/8" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Schedule() {
  const [tab, setTab] = useState(0);
  const day = schedule[tab];

  return (
    <Section
      id="schedule"
      eyebrow="Schedule"
      title="Three days, one big party."
      intro="Tap or hover any event for details. More fun activities coming soon!"
      accent="golden"
    >
      {/* Day tabs */}
      <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:inline-flex sm:rounded-full sm:bg-cream-warm/80 sm:p-1.5 sm:border sm:border-ink/10 sm:backdrop-blur">
        {schedule.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setTab(i)}
            className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition min-h-[44px] ${
              tab === i ? "text-white" : "text-ink/70 hover:text-ink bg-cream-warm/80 sm:bg-transparent border border-ink/10 sm:border-0"
            }`}
          >
            {tab === i && (
              <motion.span
                layoutId="schedule-pill"
                className="absolute inset-0 rounded-full bg-sunset shadow-lg shadow-sunset/30"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative">{d.day}<span className="hidden sm:inline opacity-70"> · {d.date}</span></span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {/* Mobile: stacked cards */}
          <div className="sm:hidden">
            <MobileSchedule items={day.items} />
          </div>
          {/* Desktop: tooltip pill grid */}
          <div className="hidden sm:block">
            <DesktopSchedule items={day.items} />
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
