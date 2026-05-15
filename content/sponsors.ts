export type Tier = {
  name: string;
  price: string;
  perks: string[];
  highlight?: boolean;
};

export const tiers: Tier[] = [
  {
    name: "Title Sponsor",
    price: "$2,500",
    perks: ["Event naming rights", "Top logo on all materials", "Main-stage recognition", "6 VIP passes", "Prime booth in Vendor Village", "Social media spotlight", "Banner placement at finish line"],
    highlight: true,
  },
  {
    name: "Race Sponsor",
    price: "$1,000",
    perks: ["Logo on race bibs & signage", "Stage callout during awards", "4 VIP passes", "Vendor booth", "Website & social logo"],
  },
  {
    name: "Gold Sponsor",
    price: "$500",
    perks: ["Logo on event website", "Signage at sponsored area", "2 VIP passes", "Social media mention"],
  },
  {
    name: "Silver Sponsor",
    price: "$100",
    perks: ["Name on event website", "1 VIP pass", "Community recognition"],
  },
  {
    name: "FBMBA Member",
    price: "Discounted",
    perks: ["Existing FBMBA sponsors receive discounted rates", "Contact us for your personalized package"],
  },
];

export const placeholderLogos = Array.from({ length: 8 }, (_, i) => `Brand ${i + 1}`);
