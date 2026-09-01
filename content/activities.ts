import { Mountain, Zap, Baby, Users, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Activity = {
  title: string;
  blurb: string;
  Icon: LucideIcon;
  accent: "sunset" | "golden" | "forest";
  /** BikeReg (or other) registration link, shown for races that require sign-up */
  registerUrl?: string;
};

export const activities: Activity[] = [
  { title: "MTB Time Trial", blurb: "FBMBA's flagship mountain bike race — your line, your clock.", Icon: Mountain, accent: "forest", registerUrl: "https://www.bikereg.com/76731" },
  { title: "Pump Track Racing", blurb: "Head-to-head brackets on the city's twisting pump track.", Icon: Zap, accent: "sunset", registerUrl: "https://www.bikereg.com/76731" },
  { title: "Kids Zone", blurb: "Strider course, helmet decorating, balance-bike races.", Icon: Baby, accent: "golden" },
  { title: "Group Rides", blurb: "Road, gravel, MTB, BMX, urban — pick your pace.", Icon: Users, accent: "sunset" },
  { title: "Vendor Village", blurb: "Local shops, brands, food trucks, and music.", Icon: Store, accent: "golden" },
];
