export type Tier = {
  name: string;
  price: string;
  perks: string[];
  highlight?: boolean;
  note?: string;
  /** opens the Zelle donation modal instead of the sponsor inquiry form */
  donation?: boolean;
  /** this tier is already filled — show a "claimed" overlay instead of an inquiry CTA */
  claimedBy?: string;
};

export const tiers: Tier[] = [
  {
    name: "Title Sponsor",
    price: "$2,500+",
    perks: [
      "Exclusive event naming rights",
      "Vendor Booth in premium location",
      "Social media mentions",
      "Event shoutouts by announcers",
      "Logo placement on event materials",
      "Logo and clickable link on FBMBA website",
      "Recognition as an FBMBA Black Diamond sponsor",
    ],
    highlight: true,
  },
  {
    name: "MTB Time Trial Sponsor",
    price: "$1,000 – $2,499",
    perks: [
      "Naming rights for MTB race",
      "Vendor Booth at prominent location",
      "Social media mentions",
      "Event shoutouts by announcers",
      "Logo placement on event materials",
      "Logo and clickable link on FBMBA website",
      "Recognition as an official FBMBA Blue Square sponsor",
    ],
    claimedBy: "The Janos Family",
  },
  {
    name: "Pump Track Sponsor",
    price: "$1,000 – $2,499",
    perks: [
      "Naming rights for Pump Track race",
      "Vendor Booth at prominent location",
      "Social media mentions",
      "Event shoutouts by announcers",
      "Logo placement on event materials",
      "Logo and clickable link on FBMBA website",
      "Recognition as an official FBMBA Blue Square sponsor",
    ],
  },
  {
    name: "Awards Sponsor",
    price: "$500 – $999",
    perks: [
      "Recognition at awards ceremony",
      "Booth at Vendor Village",
      "Social media mentions",
      "Event shoutouts by announcers",
      "Logo placement on event materials",
      "Logo and clickable link on FBMBA website",
      "Recognition as an official FBMBA Green Circle sponsor",
    ],
  },
  {
    name: "Bicycle Shops & Vendors",
    price: "$100",
    perks: [
      "Connect cyclists with local bike shops",
      "Set up tent in designated area (both days)",
    ],
    note: "Flat fee covers the full weekend.",
  },
  {
    name: "In-Kind Sponsorship",
    price: "Contact Us",
    perks: [
      "Social media mentions",
      "Event shoutouts by announcer",
      "Logo and clickable link on FBMBA website",
      "Minimum donation: $150 in merchandise",
    ],
    note: "Partnerships & donations welcome — contact us for details.",
  },
  {
    name: "Bicycle Clubs",
    price: "FREE",
    perks: [
      "We welcome bike clubs & teams of all types",
      "Set up your tent in the designated area at no cost",
    ],
    note: "Unite cycling in Sugar Land — all clubs welcome!",
  },
  {
    name: "Community Supporter",
    price: "Any Amount",
    perks: [
      "No business or sponsorship required — open to individuals, families & riders",
      "Every contribution helps FBMBA put on Bike Fest",
      "Supports a stronger cycling community in Fort Bend",
    ],
    donation: true,
  },
];

export type SponsorLogo = {
  name: string;
  /** path under /public to the logo image; omit to show a placeholder badge until logos are received */
  logoSrc?: string;
  /** logo is square/vertical in shape — render in a square tile instead of the default wide tile */
  square?: boolean;
  /** show 3x larger on its own top row, above the rest of the logo strip */
  featured?: boolean;
  /** show 2x larger on its own second row, below the featured row */
  boosted?: boolean;
  /** logo is an extra-wide banner shape (ratio > 2:1) — render in a wider tile than the default */
  banner?: boolean;
  /** banner shape at 2x, own row above the rest of the strip */
  topBanner?: boolean;
};

export const sponsorLogos: SponsorLogo[] = [
  { name: "Trek Sugar Land", logoSrc: "/images/FBMBAsponsorlogos/trek-sugar-land-cropped.png", featured: true },
  { name: "Sun & Ski Sports", logoSrc: "/images/FBMBAsponsorlogos/sun-and-ski-sports-cropped.png", featured: true },
  { name: "AFC Urgent Care Richmond", logoSrc: "/images/FBMBAsponsorlogos/afc-urgent-care-cropped.png", square: true },
  { name: "Pearland Bicycles", logoSrc: "/images/FBMBAsponsorlogos/pearland-bicycles-cropped.png", boosted: true },
  { name: "Heinrich Holistic Health", logoSrc: "/images/FBMBAsponsorlogos/heinrich-holistic-health-cropped.png", boosted: true },
  { name: "8 Degree Pedal", logoSrc: "/images/FBMBAsponsorlogos/8-degree-pedal-cropped.png", square: true },
  { name: "First Tire & Automotive", logoSrc: "/images/FBMBAsponsorlogos/first-tire-automotive-cropped.png" },
  { name: "Office Evolution Richmond", logoSrc: "/images/FBMBAsponsorlogos/office-evolution-richmond-cropped.png" },
  { name: "Texas State Optical", logoSrc: "/images/FBMBAsponsorlogos/texas-state-optical-cropped.png", square: true },
  { name: "Subcool Heating & Air Conditioning", logoSrc: "/images/FBMBAsponsorlogos/subcool-heating-air-cropped.png" },
  { name: "The Doan Law Firm, PLLC", logoSrc: "/images/FBMBAsponsorlogos/the-doan-law-firm-cropped.png" },
  { name: "Fort Harris Fence Co.", logoSrc: "/images/FBMBAsponsorlogos/fort-harris-fence-cropped.png", square: true },
  { name: "Restore Hyper Wellness", logoSrc: "/images/FBMBAsponsorlogos/restore-hyper-wellness-cropped.png" },
  { name: "Go Ape Zipline & Adventure Park", logoSrc: "/images/FBMBAsponsorlogos/go-ape-zipline-cropped.png", square: true },
];

// NOTE: display names below are best-guess reads of the filenames — please confirm/correct
// the official business names before this goes live.
export const eventSponsorLogos: SponsorLogo[] = [
  { name: "RAD AF", logoSrc: "/images/EventSponsorLogos/radaf.png", square: true },
  { name: "SL Ice", logoSrc: "/images/EventSponsorLogos/sl-ice.png", square: true },
  { name: "Sugar Land Space Cowboys", logoSrc: "/images/EventSponsorLogos/sl-space-cowboys.png", square: true },
  { name: "bikr", logoSrc: "/images/EventSponsorLogos/bikr-heart.png", banner: true },
  { name: "La Mestiza", logoSrc: "/images/EventSponsorLogos/la-mestiza.png", square: true },
  { name: "Sugar Cycles", logoSrc: "/images/EventSponsorLogos/sugar-cycles.png", square: true },
  { name: "Lone Star Cycles", logoSrc: "/images/EventSponsorLogos/lone-star-cycles-logo.png", square: true },
  { name: "Ninja", logoSrc: "/images/EventSponsorLogos/ninja.png", banner: true },
  { name: "Race Station", logoSrc: "/images/EventSponsorLogos/race-station.png", banner: true },
  { name: "Saint Arnold Brewing Co.", logoSrc: "/images/EventSponsorLogos/saint-arnold.png", topBanner: true },
];

export const mtbRaceSponsorLogos: SponsorLogo[] = [
  { name: "The Janos Family", logoSrc: "/images/MTBRaceSponsorLogos/janos-family.png", featured: true, square: true },
];
