import { ExternalLink } from "lucide-react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import { activities } from "@/content/activities";

const accentMap = {
  sunset: "from-sunset to-sunset-deep text-white",
  golden: "from-golden to-sunset text-forest-deep",
  forest: "from-forest to-forest-deep text-cream",
};

export default function Activities() {
  return (
    <Section
      id="activities"
      eyebrow="Activities"
      title="Something for every rider"
      intro="From podium chasers to first-time pedalers — pick your line."
      accent="forest"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <div className="group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-ink/10 bg-white/60 backdrop-blur p-5 sm:p-7 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-forest/10">
              <div
                className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${accentMap[a.accent]} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
              />
              <div
                className={`relative mb-4 sm:mb-5 inline-grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${accentMap[a.accent]} shadow-lg`}
              >
                <a.Icon size={22} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-forest-deep">{a.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-ink/70 leading-relaxed">{a.blurb}</p>
              {a.sponsoredBy && (
                <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-ink/45">{a.sponsoredBy}</p>
              )}
              {a.registerUrl && (
                <a
                  href={a.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-sunset px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-sunset-deep"
                >
                  Register on BikeReg <ExternalLink size={13} />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
