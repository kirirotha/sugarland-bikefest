export type ResultEntry = {
  place: number;
  name: string;
  time: string;
  hometown?: string;
};

export type ResultCategory = {
  category: string;
  entries: ResultEntry[];
  /** Full results graphic (qualifying times, bracket, final standings) */
  image?: string;
};

export type RaceResult = {
  race: string;
  date: string;
  categories: ResultCategory[];
};

export const results: RaceResult[] = [
  {
    race: "Pump Track Race",
    date: "Oct 24, 2026",
    categories: [
      {
        category: "Girls 10-13",
        image: "/images/results/pump-track/01_girls_10_13.png",
        entries: [
          {
            place: 1,
            name: "Raegan Edmunds",
            time: "28.80"
          },
          {
            place: 2,
            name: "Emersyn Strother",
            time: "39.36"
          }
        ]
      },
      {
        category: "Boys 10-13",
        image: "/images/results/pump-track/02_boys_10_13.png",
        entries: [
          {
            place: 1,
            name: "Jay McClain",
            time: "24.41"
          },
          {
            place: 2,
            name: "Levi Um",
            time: "25.10"
          },
          {
            place: 3,
            name: "Spencer Arnold",
            time: "27.21"
          },
          {
            place: 4,
            name: "Marion Chua",
            time: "DNF"
          },
          {
            place: 5,
            name: "Alan Harrison",
            time: "28.98"
          },
          {
            place: 6,
            name: "Mateo Villarreal",
            time: "32.81"
          },
          {
            place: 7,
            name: "Easton Schroeder",
            time: "33.16"
          },
          {
            place: 8,
            name: "Elliot Hofacker",
            time: "38.82"
          }
        ]
      },
      {
        category: "Boys 14-19",
        image: "/images/results/pump-track/03_boys_14_19.png",
        entries: [
          {
            place: 1,
            name: "Christopher Vargas-Le",
            time: "23.72"
          },
          {
            place: 2,
            name: "Khai Huen",
            time: "24.96"
          },
          {
            place: 3,
            name: "Zach Giannone",
            time: "33.68"
          }
        ]
      },
      {
        category: "Boys 6 and under",
        image: "/images/results/pump-track/04_boys_6_under.png",
        entries: [
          {
            place: 1,
            name: "Theodore Hofacker",
            time: "47.97"
          },
          {
            place: 2,
            name: "Phineas Hofacker",
            time: "54.19"
          }
        ]
      },
      {
        category: "Boys 7-9",
        image: "/images/results/pump-track/05_boys_7_9.png",
        entries: [
          {
            place: 1,
            name: "Damien Franco Soriano",
            time: "32.82"
          },
          {
            place: 2,
            name: "Lennon Mcclain",
            time: "33.38"
          },
          {
            place: 3,
            name: "Nixon Lucas",
            time: "34.08"
          },
          {
            place: 4,
            name: "Rhett Edmunds",
            time: "35.22"
          },
          {
            place: 5,
            name: "Landon Schroeder",
            time: "38.80"
          },
          {
            place: 6,
            name: "Julio Siguenza",
            time: "50.62"
          },
          {
            place: 7,
            name: "Charles Surfleet",
            time: "DNF"
          }
        ]
      },
      {
        category: "Men 20-29",
        image: "/images/results/pump-track/06_men_20_29.png",
        entries: [
          {
            place: 1,
            name: "Kevin Villaci Cardona",
            time: "24.52"
          },
          {
            place: 2,
            name: "William Hernandez",
            time: "25.30"
          },
          {
            place: 3,
            name: "Jason Stubbs",
            time: "26.12"
          }
        ]
      },
      {
        category: "Men 30-39",
        image: "/images/results/pump-track/07_men_30_39.png",
        entries: [
          {
            place: 1,
            name: "Robert Feltman",
            time: "24.28"
          },
          {
            place: 2,
            name: "Kody Chamberlain",
            time: "DNF"
          },
          {
            place: 3,
            name: "Demmie James Soriano",
            time: "26.36"
          },
          {
            place: 4,
            name: "Luis Valdes",
            time: "32.68"
          }
        ]
      },
      {
        category: "Men 40-49",
        image: "/images/results/pump-track/08_men_40_49.png",
        entries: [
          {
            place: 1,
            name: "Brandon Lucas",
            time: "25.71"
          },
          {
            place: 2,
            name: "Chad McClain",
            time: "26.55"
          },
          {
            place: 3,
            name: "Ryan Matocha",
            time: "28.89"
          },
          {
            place: 4,
            name: "Ralph Villarreal",
            time: "31.76"
          },
          {
            place: 5,
            name: "Jason Heredia",
            time: "32.58"
          },
          {
            place: 6,
            name: "Christopher Fernandez",
            time: "33.43"
          },
          {
            place: 7,
            name: "Kiri Um",
            time: "38.17"
          }
        ]
      },
      {
        category: "Men 50-59",
        image: "/images/results/pump-track/09_men_50_59.png",
        entries: [
          {
            place: 1,
            name: "Don Polk",
            time: "25.05"
          },
          {
            place: 2,
            name: "Quinton Norton",
            time: "26.98"
          },
          {
            place: 3,
            name: "Larry Gordon",
            time: "30.59"
          },
          {
            place: 4,
            name: "David Lunt",
            time: "34.69"
          }
        ]
      },
      {
        category: "Men 60+",
        image: "/images/results/pump-track/10_men_60.png",
        entries: [
          {
            place: 1,
            name: "Bob Powell",
            time: "36.01"
          },
          {
            place: 2,
            name: "Hoang Ha",
            time: "36.81"
          }
        ]
      },
      {
        category: "Women 30-39",
        image: "/images/results/pump-track/11_women_30_39.png",
        entries: [
          {
            place: 1,
            name: "Elena Hernandez",
            time: "DNF"
          }
        ]
      },
      {
        category: "Women 40-49",
        image: "/images/results/pump-track/12_women_40_49.png",
        entries: [
          {
            place: 1,
            name: "Judith McClain",
            time: "31.65"
          },
          {
            place: 2,
            name: "Diana Vargas-Le",
            time: "36.86"
          },
          {
            place: 3,
            name: "Rena Um",
            time: "43.44"
          }
        ]
      }
    ]
  }
];
