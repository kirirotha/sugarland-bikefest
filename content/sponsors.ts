export type Tier = {
  name: string;
  price: string;
  perks: string[];
  highlight?: boolean;
};

export const tiers: Tier[] = [
  {
    name: "Title Sponsor",
    price: "$15,000",
    perks: ["Name on event", "Top logo placement", "Main-stage moments", "10 VIP passes", "Booth in Vendor Village"],
    highlight: true,
  },
  {
    name: "Trail Sponsor",
    price: "$7,500",
    perks: ["Featured logo", "Stage callouts", "6 VIP passes", "Premium booth", "Social shoutouts"],
  },
  {
    name: "Pump Sponsor",
    price: "$3,000",
    perks: ["Pump track signage", "Logo on website", "4 VIP passes", "Vendor booth"],
  },
  {
    name: "Community",
    price: "$1,000",
    perks: ["Website logo", "2 VIP passes", "Shared community booth"],
  },
  {
    name: "In-Kind",
    price: "Goods / services",
    perks: ["Logo recognition", "Booth space", "Social mention"],
  },
];

export const placeholderLogos = Array.from({ length: 8 }, (_, i) => `Brand ${i + 1}`);
