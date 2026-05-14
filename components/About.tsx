import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import { Bike, Heart, Users, Sun } from "lucide-react";

const tiles = [
  { Icon: Bike, title: "Race", body: "MTB time trial, pump track brackets, and demo runs across two days." },
  { Icon: Sun, title: "Ride", body: "Group rides for road, gravel, BMX, urban — and every pace in between." },
  { Icon: Users, title: "Community", body: "Local cycling clubs, shops, and sponsors gathered in one Vendor Village." },
  { Icon: Heart, title: "Family", body: "Kids Zone, beginner clinics, food trucks, and live music all weekend." },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="The Festival"
      accent="golden"
    >
      <p className="mb-12 max-w-3xl font-display text-xl sm:text-2xl font-semibold text-cream leading-snug">
        Sugar Land Bike Fest is a weekend celebration of every kind of cycling. Whether you race, ride for fitness, wheelie or roll on training wheels —{" "}
        <span className="text-sunset">this weekend is for you.</span>
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(({ Icon, title, body }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="group h-full rounded-3xl border border-white/10 bg-white/8 backdrop-blur p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-sunset text-white shadow-md shadow-sunset/30 transition-transform group-hover:rotate-6">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-cream">{title}</h3>
              <p className="mt-2 text-sm text-cream/65 leading-relaxed">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
