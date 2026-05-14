export type ResultEntry = {
  place: number;
  name: string;
  time: string;
  hometown?: string;
};

export type ResultCategory = {
  category: string;
  entries: ResultEntry[];
};

export type RaceResult = {
  race: string;
  date: string;
  categories: ResultCategory[];
};

// Populate after race weekend — leave empty until results are in
export const results: RaceResult[] = [
  // Example shape (uncomment and fill in after the event):
  // {
  //   race: "MTB Time Trial",
  //   date: "Oct 24, 2026",
  //   categories: [
  //     {
  //       category: "Men's Open",
  //       entries: [
  //         { place: 1, name: "First Last", time: "14:23", hometown: "Sugar Land, TX" },
  //       ],
  //     },
  //   ],
  // },
];
