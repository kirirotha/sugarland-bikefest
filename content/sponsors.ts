export type Tier = {
  name: string;
  price: string;
  perks: string[];
  highlight?: boolean;
  note?: string;
};

export const tiers: Tier[] = [
  {
    name: "Title Sponsor",
    price: "$2,500",
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
    price: "$1,000",
    perks: [
      "Naming rights for MTB race",
      "Vendor Booth at prominent location",
      "Social media mentions",
      "Event shoutouts by announcers",
      "Logo placement on event materials",
      "Logo and clickable link on FBMBA website",
      "Recognition as an official FBMBA Blue Square sponsor",
    ],
  },
  {
    name: "Pump Track Sponsor",
    price: "$1,000",
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
    price: "$500",
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
    name: "Bicycle Clubs",
    price: "FREE",
    perks: [
      "We welcome bike clubs & teams of all types",
      "Set up your tent in the designated area at no cost",
    ],
    note: "Unite cycling in Sugar Land — all clubs welcome!",
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
];

export const placeholderLogos = Array.from({ length: 8 }, (_, i) => `Brand ${i + 1}`);
