export type ScheduleItem = {
  time: string;
  /** 24-hour minutes-from-midnight for layout math */
  startMin: number;
  durationMin: number;
  title: string;
  blurb: string;
  tag: "race" | "ride" | "kids" | "village" | "ceremony" | "social";
  /** which parallel column to place this in (0-indexed); items with same start/overlap get different columns */
  track: number;
  /** BikeReg (or other) registration link, shown for races that require sign-up */
  registerUrl?: string;
  /** small credit line, e.g. naming/race sponsor */
  sponsoredBy?: string;
};

export type ScheduleDay = {
  day: string;
  date: string;
  items: ScheduleItem[];
  displayEndMin?: number; // override grid end (minutes from midnight)
};

export const schedule: ScheduleDay[] = [
  {
    day: "Friday",
    date: "Oct 23, 2026",
    items: [
      { time: "5:00 PM", startMin: 1020, durationMin: 120, title: "Trunk-or-Treat Icebreaker", blurb: "Kick off the weekend with trunk-or-treating, music, and mingling at the pump track — costumes welcome.", tag: "social", track: 0 },
      { time: "7:00 PM", startMin: 1140, durationMin: 180, title: "Spooky Urban Ride", blurb: "Group ride through the streets of Sugar Land in your best Halloween costume. Helmets and lights are required.", tag: "ride", track: 0 },
    ],
  },
  {
    day: "Saturday",
    date: "Oct 24, 2026",
    displayEndMin: 19 * 60, // 7:00 PM
    items: [
      { time: "7:00 AM", startMin: 420, durationMin: 180, title: "Roadie Group Ride", blurb: "Road cycling group ride through Sugar Land — all paces welcome.", tag: "ride", track: 0 },
      { time: "10:00 AM", startMin: 600, durationMin: 120, title: "Bike Show", blurb: "Show off your ride and check out other riders' builds.", tag: "social", track: 0 },
      { time: "8:00 AM", startMin: 480, durationMin: 300, title: "Pump Track Showdown", blurb: "Head-to-head pump track racing — costumes encouraged.", tag: "race", track: 1, registerUrl: "https://www.bikereg.com/76731" },
      { time: "9:00 AM", startMin: 540, durationMin: 120, title: "Women's MTB Group Ride", blurb: "A women-only group ride previewing Sunday's Brindley MTB Time Trial course.", tag: "ride", track: 2 },
      { time: "8:00 AM", startMin: 480, durationMin: 420, title: "Community Bike Swap Meet", blurb: "Buy, sell, and trade bikes and gear with fellow riders.", tag: "village", track: 3 },
      { time: "8:00 AM", startMin: 480, durationMin: 420, title: "Vendor Village", blurb: "Local shops, brands, food, and gear at the pump track.", tag: "village", track: 4 },
    ],
  },
  {
    day: "Sunday",
    date: "Oct 25, 2026",
    displayEndMin: 17 * 60, // 5:00 PM
    items: [
      { time: "8:00 AM", startMin: 480, durationMin: 300, title: "Brindley MTB Time Trial", blurb: "FBMBA's flagship mountain bike time trial on the Brindley MTB trail - bonus style points for costumes.", tag: "race", track: 0, registerUrl: "https://www.bikereg.com/76731", sponsoredBy: "Supported by The Janos Family" },
      { time: "8:00 AM", startMin: 480, durationMin: 420, title: "Community Bike Swap Meet", blurb: "Buy, sell, and trade bikes and gear with fellow riders.", tag: "village", track: 1 },
      { time: "8:00 AM", startMin: 480, durationMin: 420, title: "Vendor Village", blurb: "Local shops, brands, and food at Sugar Land Memorial Park Pavilion.", tag: "village", track: 2 },
      { time: "9:00 AM", startMin: 540, durationMin: 240, title: "Pet Adoptions", blurb: "Meet adoptable pets from local rescues at Sugar Land Memorial Park.", tag: "social", track: 3 },
    ],
  },
];
