"use client";
import { useState } from "react";
import Image from "next/image";
import Section from "./ui/Section";
import Modal from "./ui/Modal";
import { MapPin, Car, Bike, Bus, ExternalLink, Calendar } from "lucide-react";

// Shows both venues — Crown Festival Park (Sat) and Sugar Land Memorial Park (Sun)
// Zoomed out slightly to fit both in frame
const EMBED_SRC = "https://www.google.com/maps/d/embed?mid=104oqvGK7ZZElXx2hbiRUMQV7RUix2PE&ll=29.56281177523550,-95.64798411061027&z=15&ehbc=2E312F&noprof=1";

const venues = [
  {
    day: "Saturday, Oct 24",
    name: "Sugar Land Pump Track",
    directionsUrl: "https://maps.app.goo.gl/bEKWwyC7MWatYk5AA",
  },
  {
    day: "Sunday, Oct 25",
    name: "South Meadow at Sugar Land Memorial Park",
    directionsUrl: "https://maps.app.goo.gl/HXVgFRz3cVD1oBAA8",
  },
];

const tips = [
  { Icon: Car,  title: "Parking",   body: "Free on-site parking with overflow at nearby lots.", image: "/images/parking-map.png" },
  { Icon: Bike, title: "Ride In",   body: "Plentiful bike racks. Best way to skip traffic." },
  { Icon: Bus,  title: "Rideshare", body: "Dedicated drop-off zone near the main entrance." },
];

export default function Location() {
  const [parkingOpen, setParkingOpen] = useState(false);

  return (
    <Section
      id="location"
      eyebrow="Find Us"
      title="Two parks, one weekend."
      intro="Both venues are side by side in Sugar Land — Crown Festival Park on Saturday, Sugar Land Memorial Park on Sunday."
      accent="forest"
    >
      <div className="grid gap-8 lg:grid-cols-5 overflow-hidden">
        {/* Map */}
        <div className="lg:col-span-3 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-ink/10 shadow-xl shadow-forest/20 min-h-[220px] sm:min-h-[300px] lg:min-h-[360px]">
          {EMBED_SRC ? (
            <iframe
              src={EMBED_SRC}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sugar Land Bike Fest venue map"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-forest to-forest-deep flex flex-col items-center justify-center text-center p-8">
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0 2px, transparent 2px 16px)" }}
              />
              <MapPin size={48} className="relative text-golden mb-4" />
              <h3 className="relative font-display text-3xl font-semibold text-cream">Sugar Land, TX</h3>
              <p className="relative mt-2 text-cream/70 max-w-sm text-sm">Interactive map loading soon.</p>
            </div>
          )}

          {/* Venue direction buttons overlaid on map */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex flex-col gap-2 max-w-[calc(100%-1.5rem)]">
            {venues.map(({ day, name, directionsUrl }) => (
              <a
                key={name}
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 sm:px-4 py-2 text-xs font-semibold text-forest-deep shadow-lg hover:bg-white transition min-h-[36px] overflow-hidden"
              >
                <MapPin size={13} className="text-sunset shrink-0" />
                <span className="truncate">{name}</span>
                <span className="text-ink/40 font-normal hidden sm:inline shrink-0">· {day}</span>
                <ExternalLink size={11} className="text-ink/40 shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Venue cards + travel tips */}
        <div className="lg:col-span-2 space-y-3">
          {/* Per-day venue cards */}
          {venues.map(({ day, name, directionsUrl }) => (
            <a
              key={name}
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white/60 backdrop-blur p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/10 group overflow-hidden w-full"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest text-cream shadow-md">
                <Calendar size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">{day}</p>
                <h4 className="font-semibold text-ink">{name}</h4>
                <p className="text-xs text-forest mt-0.5 flex items-center gap-1">
                  Directions <ExternalLink size={10} />
                </p>
              </div>
            </a>
          ))}

          {/* Travel tips */}
          {tips.map(({ Icon, title, body, image }) => {
            const content = (
              <>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-golden text-forest-deep shadow-md">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-ink flex items-center gap-1.5">
                    {title}
                    {image && <ExternalLink size={12} className="text-ink/40" />}
                  </h4>
                  <p className="text-sm text-ink/65">{body}</p>
                </div>
              </>
            );
            return image ? (
              <button
                key={title}
                type="button"
                onClick={() => setParkingOpen(true)}
                className="flex w-full items-start gap-4 rounded-2xl border border-ink/10 bg-white/60 backdrop-blur p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/10 cursor-pointer"
              >
                {content}
              </button>
            ) : (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white/60 backdrop-blur p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/10"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        open={parkingOpen}
        onClose={() => setParkingOpen(false)}
        title="Parking & Access"
        subtitle="Pump Track and MTB parking directions"
      >
        <div className="p-4 sm:p-6 md:p-8">
          <Image
            src="/images/parking-map.png"
            alt="Parking directions map for Sugar Land Bike Fest — Pump Track and MTB venues"
            width={1200}
            height={1200}
            className="w-full h-auto rounded-xl border border-ink/10"
          />
        </div>
      </Modal>
    </Section>
  );
}
