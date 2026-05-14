import { Mountain, Zap, Baby, GraduationCap, Users, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Activity = {
  title: string;
  blurb: string;
  Icon: LucideIcon;
  accent: "sunset" | "golden" | "forest";
};

export const activities: Activity[] = [
  { title: "MTB Time Trial", blurb: "FBMBA's flagship mountain bike race — your line, your clock.", Icon: Mountain, accent: "forest" },
  { title: "Pump Track Racing", blurb: "Head-to-head brackets on the city's newest pump track.", Icon: Zap, accent: "sunset" },
  { title: "Kids Zone", blurb: "Strider course, helmet decorating, balance-bike races.", Icon: Baby, accent: "golden" },
  { title: "Beginner Clinics", blurb: "Coached skills sessions — no experience required.", Icon: GraduationCap, accent: "forest" },
  { title: "Group Rides", blurb: "Road, gravel, MTB, BMX, urban — pick your pace.", Icon: Users, accent: "sunset" },
  { title: "Vendor Village", blurb: "Local shops, brands, food trucks, and live music.", Icon: Store, accent: "golden" },
];
