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
  /** short host credit shown on the grid pill, e.g. "by MCC" */
  byline?: string;
  /** route map link (e.g. Strava), shown as a button in the event card */
  routeUrl?: string;
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
      { time: "5:00 PM", startMin: 1020, durationMin: 120, title: "Trunk-or-Treat Icebreaker", blurb: "Location: Sugar Land Pump Track. Trunk-or-treating, music and mingling at the pump track. Costumes welcome. Free / No registration.", tag: "social", track: 0 },
      { time: "5:30 PM", startMin: 1050, durationMin: 90, title: "Trail Group Ride", blurb: "Start: Sugar Land Pump Track. Casual trail MTB ride led by Noel Lopez. Free / No registration.", tag: "ride", track: 1, byline: "by Sugar Cycles" },
      { time: "7:00 PM", startMin: 1140, durationMin: 180, title: "Spooky Urban Ride Out", blurb: "Start: Sugar Land Pump Track. Halloween group ride through the streets of Sugar Land. Costumes encouraged. Helmets and lights required. Free / No registration.", tag: "ride", track: 0 },
    ],
  },
  {
    day: "Saturday",
    date: "Oct 24, 2026",
    displayEndMin: 19 * 60, // 7:00 PM
    items: [
      { time: "7:00 AM", startMin: 420, durationMin: 180, title: "Road Ride", blurb: "Start/End: Sugar Land Pump Track Parking Lot. Road bike ride. 40.9 miles with a rest stop at mile 20. Arrive early for a brief safety meeting. Pace groups: A (21–23 mph), B (19–21 mph), C (17–19 mph) rolling speed. Free / No registration.", tag: "ride", track: 0, byline: "by Motherland Cycling Club", routeUrl: "https://www.strava.com/routes/3547648973311438696", sponsoredBy: "Hosted by Motherland Cycling Club" },
      { time: "10:00 AM", startMin: 600, durationMin: 120, title: "Bike Show", blurb: "Location: Sugar Land Pump Track. Show off your ride and check out other builds. Free / No registration.", tag: "social", track: 0 },
      { time: "8:00 AM", startMin: 480, durationMin: 300, title: "Pump Track Showdown", blurb: "Location: Sugar Land Pump Track. Head-to-head pump track racing. Costumes encouraged. Race registration required.", tag: "race", track: 1, byline: "Sponsored by Heinrich Holistic Health", registerUrl: "https://www.bikereg.com/76731", sponsoredBy: "Supported by Heinrich Holistic Health" },
      { time: "9:00 AM", startMin: 540, durationMin: 120, title: "Women's MTB Group Ride", blurb: "Start: Sugar Land Pump Track. Women's group ride led by Dana Hilde, previewing Sunday's Brindley MTB Time Trial course. Free / No registration.", tag: "ride", track: 2 },
      { time: "8:00 AM", startMin: 480, durationMin: 420, title: "Community Bike Swap Meet", blurb: "Location: Sugar Land Pump Track. Buy, sell and trade bikes and gear. Free to participate / attend.", tag: "village", track: 3 },
      { time: "8:00 AM", startMin: 480, durationMin: 420, title: "Vendor Village", blurb: "Location: Sugar Land Pump Track. Local shops, brands, food and gear. Free to attend.", tag: "village", track: 4 },
    ],
  },
  {
    day: "Sunday",
    date: "Oct 25, 2026",
    displayEndMin: 17 * 60, // 5:00 PM
    items: [
      { time: "7:00 AM", startMin: 420, durationMin: 210, title: "Road Ride", blurb: "Start: Pawm Springs Dog Park, Sugar Land Memorial Park (15300 University Blvd). Road bike ride, 31.1 miles at a steady, moderate ~18 mph pace. Experience riding in a group recommended. Free / No registration.", tag: "ride", track: 4, byline: "by Motherland Cycling Club", routeUrl: "https://www.strava.com/routes/3282408552912166054", sponsoredBy: "Hosted by Motherland Cycling Club" },
      { time: "8:00 AM", startMin: 480, durationMin: 300, title: "Brindley MTB Time Trial", blurb: "Location: Justin P. Brindley Trail @ Sugar Land Memorial Park. FBMBA's flagship MTB time trial. Costumes encouraged. Race registration required.", tag: "race", track: 0, byline: "Sponsored by The Janos Family", registerUrl: "https://www.bikereg.com/76731", sponsoredBy: "Supported by The Janos Family" },
      { time: "8:00 AM", startMin: 480, durationMin: 420, title: "Community Bike Swap Meet", blurb: "Location: Sugar Land Memorial Park Pavilion. Free to participate / attend.", tag: "village", track: 1 },
      { time: "8:00 AM", startMin: 480, durationMin: 420, title: "Vendor Village", blurb: "Location: Sugar Land Memorial Park Pavilion. Local shops, brands and food. Free to attend.", tag: "village", track: 2 },
      { time: "9:00 AM", startMin: 540, durationMin: 240, title: "Pet Adoptions", blurb: "Location: Sugar Land Memorial Park. With Sugar Land Animal Services and Fort Bend County Animal Services. Free to attend.", tag: "social", track: 3 },
    ],
  },
];
