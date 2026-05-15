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
      { time: "5:00 PM", startMin: 1020, durationMin: 120, title: "Icebreaker at the Pump Track", blurb: "Come meet fellow riders and get your first look at the pump track.", tag: "social", track: 0 },
      { time: "7:00 PM", startMin: 1140, durationMin: 120, title: "Urban Bike Ride", blurb: "Group ride through the streets of Sugar Land.", tag: "ride", track: 0 },
    ],
  },
  {
    day: "Saturday",
    date: "Oct 24, 2026",
    displayEndMin: 19 * 60, // 7:00 PM
    items: [
      { time: "8:00 AM", startMin: 480, durationMin: 300, title: "Monster Mash Dash Pump Track Race", blurb: "Head-to-head pump track racing — costumes encouraged.", tag: "race", track: 0 },
      { time: "9:00 AM", startMin: 540, durationMin: 180, title: "Community Bike Swap Meet", blurb: "Buy, sell, and trade bikes and gear with fellow riders.", tag: "village", track: 1 },
    ],
  },
  {
    day: "Sunday",
    date: "Oct 25, 2026",
    displayEndMin: 17 * 60, // 5:00 PM
    items: [
      { time: "8:00 AM", startMin: 480, durationMin: 300, title: "Brindley MTB Time Trial", blurb: "FBMBA's flagship mountain bike time trial on the Brindley MTB trail - bonus style points for costumes.", tag: "race", track: 0 },
    ],
  },
];
