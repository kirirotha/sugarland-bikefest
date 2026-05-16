"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Bike, Baby, Store, Music, Sparkles } from "lucide-react";
import Section from "./ui/Section";
import { schedule, type ScheduleItem, type ScheduleDay } from "@/content/schedule";

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
  social:   "border-l-golden/60",
};

const SLOT = 60;  // minutes per grid row
const ROW_H = 44; // px per row
const COL_COUNT = 3; // always render this many track columns

function formatMin(min: number) {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

/* ── Mobile: time grid (mirrors desktop, single column) ── */
function MobileEventBlock({
  item,
  gridStyle,
  open,
  onToggle,
}: {
  item: ScheduleItem;
  gridStyle: React.CSSProperties;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = tagIcon[item.tag];
  const endTime = formatMin(item.startMin + item.durationMin);
  return (
    <div className="relative" style={gridStyle}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={`h-full w-full text-left rounded-lg border border-l-2 ${tagBorder[item.tag]} border-ink/10 bg-white/80 backdrop-blur px-1.5 py-1 flex items-start gap-1 overflow-hidden transition-all duration-200 ${open ? "bg-white shadow-lg shadow-forest/10" : ""}`}
      >
        <div className={`grid h-5 w-5 shrink-0 place-items-center rounded-md ${tagChip[item.tag]} mt-0.5`}>
          <Icon size={10} />
        </div>
        <span className="font-semibold text-[10px] text-ink leading-snug line-clamp-5 break-words min-w-0">{item.title}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(280px,80vw)] rounded-2xl border border-white/10 bg-[#0e0c0a]/90 backdrop-blur-md shadow-2xl shadow-black/50 p-4 cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${tagChip[item.tag]}`}>
                <Icon size={13} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-golden/80">{tagLabel[item.tag]}</p>
                <p className="text-[11px] text-cream/60 leading-none">{item.time} – {endTime}</p>
              </div>
            </div>
            <p className="font-display font-semibold text-sm text-cream leading-snug">{item.title}</p>
            <p className="mt-1.5 text-xs text-cream/60 leading-relaxed">{item.blurb}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSchedule({ day }: { day: ScheduleDay }) {
  const { items, displayEndMin } = day;
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeTitle) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setActiveTitle(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [activeTitle]);

  const trackCount = Math.max(...items.map((i) => i.track)) + 1;
  const gridStart = Math.min(...items.map((i) => i.startMin));
  const gridEnd   = displayEndMin ?? Math.max(...items.map((i) => i.startMin + i.durationMin));
  const totalRows = Math.ceil((gridEnd - gridStart) / SLOT);

  const labels: number[] = [];
  for (let m = gridStart; m <= gridEnd; m += SLOT) labels.push(m);

  function toRow(min: number) {
    return Math.round((min - gridStart) / SLOT) + 1;
  }

  return (
    <div
      ref={wrapRef}
      style={{
        display: "grid",
        gridTemplateColumns: `2rem repeat(${trackCount}, 1fr)`,
        gridTemplateRows: `repeat(${totalRows}, ${ROW_H}px)`,
        columnGap: "4px",
      }}
    >
      {/* Time labels */}
      {labels.map((min, i) => (
        <div
          key={min}
          style={{ gridColumn: 1, gridRow: i + 1, alignSelf: "start" }}
          className="text-right pr-1 pt-1"
        >
          <span className="font-display text-[9px] font-semibold text-golden tabular-nums leading-none">
            {formatMin(min).split(" ")[0]}
          </span>
          <span className="block text-[7px] text-cream/50 uppercase tracking-wide leading-none mt-0.5">
            {formatMin(min).split(" ")[1]}
          </span>
        </div>
      ))}

      {/* Horizontal grid lines */}
      {labels.map((min, i) => (
        <div
          key={`line-${min}`}
          style={{
            gridColumn: `2 / ${trackCount + 2}`,
            gridRow: i + 1,
            alignSelf: "start",
            borderTop: "1px dashed rgba(14,12,10,0.08)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Events */}
      {items.map((item) => {
        const startRow = toRow(item.startMin);
        const endRow   = toRow(item.startMin + item.durationMin);
        return (
          <MobileEventBlock
            key={item.title}
            item={item}
            open={activeTitle === item.title}
            onToggle={() => setActiveTitle(activeTitle === item.title ? null : item.title)}
            gridStyle={{
              gridColumn: item.track + 2,
              gridRow: `${startRow} / ${endRow}`,
              margin: "4px 0",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Desktop: proportional time grid, hover tooltip ── */
function EventBlock({
  item,
  gridStyle,
}: {
  item: ScheduleItem;
  gridStyle: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = tagIcon[item.tag];
  const endTime = formatMin(item.startMin + item.durationMin);
  return (
    <div
      className="relative"
      style={gridStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Event pill */}
      <div
        className={`h-full rounded-2xl border border-l-4 ${tagBorder[item.tag]} border-ink/10 bg-white/80 backdrop-blur px-3 py-2 flex items-center gap-2 cursor-default transition-all duration-200 ${hovered ? "bg-white shadow-lg shadow-forest/10" : ""}`}
      >
        <div className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${tagChip[item.tag]}`}>
          <Icon size={12} />
        </div>
        <span className="font-semibold text-sm text-ink leading-snug truncate">{item.title}</span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(280px,80%)] rounded-2xl border border-white/10 bg-[#0e0c0a]/90 backdrop-blur-md shadow-2xl shadow-black/50 p-4"
          >
            {/* Tag + time */}
            <div className="flex items-center gap-2 mb-2">
              <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${tagChip[item.tag]}`}>
                <Icon size={13} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-golden/80">{tagLabel[item.tag]}</p>
                <p className="text-[11px] text-cream/60 leading-none">{item.time} – {endTime}</p>
              </div>
            </div>
            <p className="font-display font-semibold text-sm text-cream leading-snug">{item.title}</p>
            <p className="mt-1.5 text-xs text-cream/60 leading-relaxed">{item.blurb}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopSchedule({ day }: { day: ScheduleDay }) {
  const { items, displayEndMin } = day;
  const trackCount = Math.max(...items.map((i) => i.track)) + 1;
  const gridStart = Math.min(...items.map((i) => i.startMin));
  const gridEnd   = displayEndMin ?? Math.max(...items.map((i) => i.startMin + i.durationMin));
  const totalRows = Math.ceil((gridEnd - gridStart) / SLOT);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [, forceRender] = useState(0);
  useEffect(() => { forceRender(1); }, []);

  // Generate one label per SLOT from gridStart through gridEnd (inclusive)
  const labels: number[] = [];
  for (let m = gridStart; m <= gridEnd; m += SLOT) labels.push(m);

  function toRow(min: number) {
    return Math.round((min - gridStart) / SLOT) + 1;
  }

  return (
    <div ref={wrapRef}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `5rem repeat(${COL_COUNT}, 1fr)`,
          gridTemplateRows: `repeat(${totalRows}, ${ROW_H}px)`,
          columnGap: "8px",
        }}
      >
        {/* Time labels */}
        {labels.map((min, i) => (
          <div
            key={min}
            style={{ gridColumn: 1, gridRow: i + 1, alignSelf: "start" }}
            className="text-right pr-3 pt-1"
          >
            <span className="font-display text-sm font-semibold text-golden tabular-nums leading-none">
              {formatMin(min).split(" ")[0]}
            </span>
            <span className="block text-[10px] text-cream/50 uppercase tracking-wide leading-none mt-0.5">
              {formatMin(min).split(" ")[1]}
            </span>
          </div>
        ))}

        {/* Horizontal grid lines */}
        {labels.map((min, i) => (
          <div
            key={`line-${min}`}
            style={{
              gridColumn: `2 / ${COL_COUNT + 2}`,
              gridRow: i + 1,
              alignSelf: "start",
              borderTop: "1px dashed rgba(14,12,10,0.08)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Events */}
        {items.map((item) => {
          const startRow = toRow(item.startMin);
          const endRow   = toRow(item.startMin + item.durationMin);
          return (
            <EventBlock
              key={item.title}
              item={item}
              gridStyle={{
                gridColumn: item.track + 2,
                gridRow: `${startRow} / ${endRow}`,
                margin: "4px 0",
              }}
            />
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
      intro="Events are subject to change. More activities coming soon!"
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
          <div className="sm:hidden">
            <MobileSchedule day={day} />
          </div>
          <div className="hidden sm:block">
            <DesktopSchedule day={day} />
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
