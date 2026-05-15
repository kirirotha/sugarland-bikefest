import Section from "./ui/Section";
import { MapPin, Car, Bike, Bus, ExternalLink } from "lucide-react";

// To get the embed src:
// 1. Open the share link in Google Maps
// 2. Share → Embed a map → copy the src="..." value
// 3. Replace EMBED_SRC below with that value
const EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6940.259431961929!2d-95.6640950874939!3d29.570828869821515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e3fd2446ef2f%3A0xec6dcd0f123fd266!2sThe%20Crown%20Festival%20Park%20at%20Sugar%20Land!5e0!3m2!1sen!2sus!4v1778728036247!5m2!1sen!2sus";

const DIRECTIONS_URL = "https://maps.app.goo.gl/bEKWwyC7MWatYk5AA";

const tips = [
  { Icon: Car,   title: "Parking",   body: "Free on-site parking with overflow at nearby lots." },
  { Icon: Bike,  title: "Ride In",   body: "Plentiful bike racks. Best way to skip traffic." },
  { Icon: Bus,   title: "Rideshare", body: "Dedicated drop-off zone near the main gate." },
];

export default function Location() {
  return (
    <Section
      id="location"
      eyebrow="Find Us"
      title="The Crown Festival Park, Sugar Land."
      intro="One of Sugar Land's premier event venues — open fields, trails, and plenty of room to ride."
      accent="forest"
    >
      <div className="grid gap-8 lg:grid-cols-5">
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
            /* Placeholder shown until embed src is added */
            <div className="absolute inset-0 bg-gradient-to-br from-forest to-forest-deep flex flex-col items-center justify-center text-center p-8">
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0 2px, transparent 2px 16px)" }}
              />
              <MapPin size={48} className="relative text-golden mb-4" />
              <h3 className="relative font-display text-3xl font-semibold text-cream">Sugar Land, TX</h3>
              <p className="relative mt-2 text-cream/70 max-w-sm text-sm">
                Interactive map loading soon.
              </p>
            </div>
          )}

          {/* Directions button overlaid on map */}
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-forest-deep shadow-lg hover:bg-white transition min-h-[40px]"
          >
            <MapPin size={15} className="text-sunset" />
            Get Directions
            <ExternalLink size={13} className="text-ink/40" />
          </a>
        </div>

        {/* Travel tips */}
        <div className="lg:col-span-2 space-y-3">
          {tips.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white/60 backdrop-blur p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/10"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-golden text-forest-deep shadow-md">
                <Icon size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-ink">{title}</h4>
                <p className="text-sm text-ink/65">{body}</p>
              </div>
            </div>
          ))}

          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-2 w-full rounded-2xl border border-ink/10 bg-white/60 backdrop-blur p-4 text-sm font-semibold text-forest-deep hover:bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/10"
          >
            <MapPin size={16} className="text-sunset" />
            Open in Google Maps
            <ExternalLink size={14} className="text-ink/40" />
          </a>
        </div>
      </div>
    </Section>
  );
}
