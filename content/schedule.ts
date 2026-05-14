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
};

export const schedule: ScheduleDay[] = [
  {
    day: "Friday",
    date: "Oct 23, 2026",
    items: [
      { time: "5:00 PM", startMin: 1020, durationMin: 120, title: "Vendor & Sponsor Setup", blurb: "Booths open for early load-in and setup.", tag: "village", track: 0 },
      { time: "5:00 PM", startMin: 1020, durationMin: 60,  title: "Race Packet Pickup", blurb: "Grab your bib, swag bag, and timing chip.", tag: "race", track: 1 },
      { time: "6:00 PM", startMin: 1080, durationMin: 90,  title: "Pre-Ride Social + Food Trucks", blurb: "Kick off the weekend with fellow riders over tacos and cold ones.", tag: "social", track: 0 },
      { time: "6:00 PM", startMin: 1080, durationMin: 90,  title: "Packet Pickup Continues", blurb: "Last call for race-day packet pickup.", tag: "race", track: 1 },
      { time: "7:30 PM", startMin: 1170, durationMin: 60,  title: "Riders' Meeting", blurb: "Course walkthrough, rules briefing, Q&A with race directors.", tag: "ceremony", track: 0 },
      { time: "7:30 PM", startMin: 1170, durationMin: 60,  title: "Kids Zone Preview + Movie Night", blurb: "Family area sneak peek and an outdoor film for the little ones.", tag: "kids", track: 1 },
    ],
  },
  {
    day: "Saturday",
    date: "Oct 24, 2026",
    items: [
      { time: "7:00 AM", startMin: 420,  durationMin: 90,  title: "Gates Open · Packet Pickup", blurb: "Coffee, breakfast tacos, race-day check-in.", tag: "village", track: 0 },
      { time: "7:00 AM", startMin: 420,  durationMin: 90,  title: "Pump Track Warm-Up (Open)", blurb: "Free practice laps before racing begins.", tag: "race", track: 1 },
      { time: "8:30 AM", startMin: 510,  durationMin: 180, title: "MTB Time Trial — Wave 1", blurb: "FBMBA's flagship mountain bike time trial.", tag: "race", track: 0 },
      { time: "9:00 AM", startMin: 540,  durationMin: 90,  title: "Beginner Group Ride", blurb: "5-mile coached ride with FBMBA ambassadors.", tag: "ride", track: 1 },
      { time: "10:00 AM", startMin: 600, durationMin: 120, title: "Kids Zone Opens", blurb: "Strider course, balance bikes, helmet decorating.", tag: "kids", track: 2 },
      { time: "11:00 AM", startMin: 660, durationMin: 60,  title: "MTB Time Trial — Wave 2", blurb: "Second wave for registered racers.", tag: "race", track: 0 },
      { time: "11:00 AM", startMin: 660, durationMin: 60,  title: "Gravel Group Ride", blurb: "Mixed-surface group ride departing from the main stage.", tag: "ride", track: 1 },
      { time: "12:00 PM", startMin: 720, durationMin: 180, title: "Vendor Village + Food Trucks", blurb: "Local shops, brands, and bites in full swing.", tag: "village", track: 0 },
      { time: "12:30 PM", startMin: 750, durationMin: 90,  title: "Pump Track — Skills Clinics", blurb: "Coached sessions for all ages and ability levels.", tag: "race", track: 1 },
      { time: "2:00 PM", startMin: 840, durationMin: 90,  title: "Pump Track — Open Sessions", blurb: "Free-ride blocks, laps for glory.", tag: "race", track: 1 },
      { time: "2:00 PM", startMin: 840, durationMin: 90,  title: "Urban / BMX Casual Showcase", blurb: "Trick demos and flatland from local riders.", tag: "ride", track: 2 },
      { time: "5:00 PM", startMin: 1020, durationMin: 90, title: "Day 1 Awards + Live Music", blurb: "Podiums, raffle, and a sunset jam.", tag: "ceremony", track: 0 },
    ],
  },
  {
    day: "Sunday",
    date: "Oct 25, 2026",
    items: [
      { time: "7:30 AM", startMin: 450,  durationMin: 90,  title: "Road Group Ride", blurb: "Two pace groups roll from the main stage.", tag: "ride", track: 0 },
      { time: "7:30 AM", startMin: 450,  durationMin: 90,  title: "MTB Trail Guided Ride", blurb: "Easy trail ride for MTB guests and out-of-towners.", tag: "ride", track: 1 },
      { time: "9:00 AM", startMin: 540,  durationMin: 120, title: "Pump Track Race", blurb: "Head-to-head brackets — BMX and MTB classes.", tag: "race", track: 0 },
      { time: "9:00 AM", startMin: 540,  durationMin: 60,  title: "Kids Pump Track — Beginner Brackets", blurb: "Little ones go first. Medals for everyone.", tag: "kids", track: 1 },
      { time: "10:30 AM", startMin: 630, durationMin: 60,  title: "Urban Cycling Showcase", blurb: "Trick demos and flatland from local riders.", tag: "ride", track: 0 },
      { time: "10:30 AM", startMin: 630, durationMin: 60,  title: "Beginner Clinic — Pump Track 101", blurb: "Learn the rollers, the berms, the flow.", tag: "kids", track: 1 },
      { time: "11:30 AM", startMin: 690, durationMin: 60,  title: "Family Ride + Parade Lap", blurb: "Decorate your bike. Slowest wins style points.", tag: "kids", track: 0 },
      { time: "11:30 AM", startMin: 690, durationMin: 90,  title: "Vendor Village + Demos", blurb: "Test rides, bike fitting, and giveaways.", tag: "village", track: 1 },
      { time: "1:00 PM", startMin: 750, durationMin: 60,  title: "Gravel Ride — Community Loop", blurb: "Leisurely gravel loop for late-risers.", tag: "ride", track: 0 },
      { time: "3:30 PM", startMin: 930, durationMin: 60,  title: "Closing Ceremony + Awards", blurb: "Overall awards, sponsor thank-yous, raffle finale.", tag: "ceremony", track: 0 },
    ],
  },
];
