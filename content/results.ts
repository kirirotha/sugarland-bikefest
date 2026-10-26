export type ResultEntry = {
  /** Omitted for DNF / unplaced riders */
  place?: number;
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
    race: "MTB Time Trial",
    date: "Oct 25, 2026",
    categories: [
      {
        category: "Boys 10 & Under",
        entries: [
          {
            place: 1,
            name: "Kabir Sarao",
            time: "09:47.76"
          },
          {
            place: 2,
            name: "Charles Surfleet",
            time: "09:53.36"
          },
          {
            place: 3,
            name: "William John",
            time: "10:43.18"
          },
          {
            place: 4,
            name: "Angad Vir Sarao",
            time: "10:43.62"
          },
          {
            place: 5,
            name: "Jensen Schrader",
            time: "10:53.79"
          },
          {
            place: 6,
            name: "Emmet King",
            time: "11:11.66"
          },
          {
            place: 7,
            name: "Rhett Edmunds",
            time: "11:28.77"
          },
          {
            place: 8,
            name: "Cesar Gael Landeros",
            time: "12:49.95"
          },
          {
            place: 9,
            name: "Lennon McClain",
            time: "13:00.85"
          },
          {
            place: 10,
            name: "Grayson Maness",
            time: "13:05.48"
          },
          {
            place: 11,
            name: "Gabriel Saenz",
            time: "15:13.67"
          },
          {
            place: 12,
            name: "Cooper McFadgen",
            time: "15:57.25"
          },
          {
            place: 13,
            name: "Trym Askestad",
            time: "20:40.10"
          },
          {
            place: 14,
            name: "Leonel Arredondo",
            time: "21:05.90"
          }
        ]
      },
      {
        category: "Girls 10 & Under",
        entries: [
          {
            place: 1,
            name: "Adaline Saenz",
            time: "11:58.83"
          }
        ]
      },
      {
        category: "Boys 11-13",
        entries: [
          {
            place: 1,
            name: "Ryan Rosalez",
            time: "19:47.69"
          },
          {
            place: 2,
            name: "Levi Um",
            time: "20:29.68"
          },
          {
            place: 3,
            name: "Cris Thachet",
            time: "20:33.17"
          },
          {
            place: 4,
            name: "Elijah Nevarez",
            time: "24:36.91"
          },
          {
            place: 5,
            name: "Marcus Harvey Perez",
            time: "27:40.88"
          }
        ]
      },
      {
        category: "Girls 11-13",
        entries: [
          {
            place: 1,
            name: "Ella Brownlee",
            time: "21:17.05"
          },
          {
            place: 2,
            name: "Raegan Edmunds",
            time: "26:06.24"
          },
          {
            place: 3,
            name: "Olivia Herring",
            time: "27:22.88"
          }
        ]
      },
      {
        category: "Men 17-29",
        entries: [
          {
            place: 1,
            name: "Elias Hugh",
            time: "16:18.27"
          },
          {
            place: 2,
            name: "Marcos Reyes",
            time: "16:57.56"
          },
          {
            place: 3,
            name: "Hayden Smith",
            time: "19:18.04"
          },
          {
            place: 4,
            name: "David Garcia",
            time: "20:45.64"
          }
        ]
      },
      {
        category: "Men 30-39",
        entries: [
          {
            place: 1,
            name: "Geriet Crumm",
            time: "16:34.33"
          },
          {
            place: 2,
            name: "Spencer Johnson",
            time: "17:19.67"
          },
          {
            place: 3,
            name: "Justin Munoz",
            time: "17:26.47"
          },
          {
            place: 4,
            name: "Melvin Villa",
            time: "18:11.32"
          },
          {
            place: 5,
            name: "Alissandro Castillo Carreño",
            time: "18:40.50"
          },
          {
            place: 6,
            name: "Ryan Gill",
            time: "20:23.01"
          },
          {
            place: 7,
            name: "Robert Feltman",
            time: "20:42.20"
          },
          {
            place: 8,
            name: "Bharath Maddipudi",
            time: "21:10.39"
          }
        ]
      },
      {
        category: "Men 40-49",
        entries: [
          {
            place: 1,
            name: "Jason Sessions",
            time: "16:05.79"
          },
          {
            place: 2,
            name: "Colby Rivet",
            time: "16:11.25"
          },
          {
            place: 3,
            name: "Ryan Matocha",
            time: "17:07.01"
          },
          {
            place: 4,
            name: "Aaron Ramirez",
            time: "19:47.01"
          },
          {
            place: 5,
            name: "Sojan P.",
            time: "19:55.95"
          },
          {
            place: 6,
            name: "Alex Janos",
            time: "19:58.33"
          },
          {
            place: 7,
            name: "Oscar Saenz",
            time: "21:11.28"
          },
          {
            place: 8,
            name: "Chad McClain",
            time: "22:15.61"
          }
        ]
      },
      {
        category: "Men 50-59",
        entries: [
          {
            place: 1,
            name: "Wade Greathouse",
            time: "16:00.03"
          },
          {
            place: 2,
            name: "Thomas Aardahl",
            time: "16:12.44"
          },
          {
            place: 3,
            name: "Caleb Hood",
            time: "16:18.84"
          },
          {
            place: 4,
            name: "Vance Smith",
            time: "17:12.63"
          },
          {
            place: 5,
            name: "Dave Howell",
            time: "17:40.84"
          },
          {
            place: 6,
            name: "Kurush Aga",
            time: "17:41.23"
          },
          {
            place: 7,
            name: "Michael Cogan",
            time: "19:09.72"
          },
          {
            place: 8,
            name: "Ben Torres",
            time: "20:20.74"
          },
          {
            place: 9,
            name: "Shaughn Uebinger",
            time: "24:52.06"
          },
          {
            name: "Aksel Quintus-Bosz",
            time: "DNF"
          }
        ]
      },
      {
        category: "Men 60+",
        entries: [
          {
            place: 1,
            name: "Gabe Worley",
            time: "16:58.94"
          },
          {
            place: 2,
            name: "Tom Benzaia",
            time: "17:19.05"
          },
          {
            place: 3,
            name: "Jeff Lendermon",
            time: "18:08.26"
          },
          {
            place: 4,
            name: "Timothy Motes",
            time: "18:26.03"
          },
          {
            place: 5,
            name: "Richard Humphreys",
            time: "19:14.64"
          },
          {
            place: 6,
            name: "Luis Pagan",
            time: "19:30.04"
          },
          {
            place: 7,
            name: "Tom Zizka",
            time: "19:46.39"
          }
        ]
      },
      {
        category: "Women 30-39",
        entries: [
          {
            place: 1,
            name: "Lisa Edmunds",
            time: "24:45.23"
          }
        ]
      },
      {
        category: "Women 40-49",
        entries: [
          {
            place: 1,
            name: "Allison Sessions",
            time: "17:34.39"
          },
          {
            place: 2,
            name: "Diana Vargas-Le",
            time: "21:45.51"
          },
          {
            place: 3,
            name: "Judith McClain",
            time: "23:58.94"
          },
          {
            place: 4,
            name: "Ann Matocha",
            time: "25:05.68"
          }
        ]
      },
      {
        category: "Women 50-59",
        entries: [
          {
            place: 1,
            name: "Brandi Greathouse",
            time: "18:53.21"
          },
          {
            place: 2,
            name: "Dana Hilde",
            time: "21:03.36"
          },
          {
            place: 3,
            name: "Julianne Betters",
            time: "25:04.55"
          }
        ]
      },
      {
        category: "Men E-Bike Open",
        entries: [
          {
            place: 1,
            name: "Malvic Hilado",
            time: "14:27.43"
          },
          {
            place: 2,
            name: "Michael Kaser",
            time: "14:44.90"
          },
          {
            place: 3,
            name: "Colby Rivet",
            time: "14:57.43"
          },
          {
            place: 4,
            name: "Steven Fipke",
            time: "14:57.59"
          },
          {
            place: 5,
            name: "Brad Kuntz",
            time: "15:00.42"
          },
          {
            place: 6,
            name: "Chris Champeaux",
            time: "16:18.13"
          },
          {
            place: 7,
            name: "David Lunt",
            time: "16:41.27"
          }
        ]
      },
      {
        category: "Women E-Bike Open",
        entries: [
          {
            place: 1,
            name: "Cindy Moran",
            time: "18:07.75"
          },
          {
            place: 2,
            name: "Nadine Holbert",
            time: "19:34.87"
          }
        ]
      }
    ]
  },
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

// Class buttons run youngest to oldest, girls/women before boys/men, e-bike last
const classOrder = [
  "Girls 6 and under", "Boys 6 and under", "Girls 7-9", "Boys 7-9",
  "Girls 10 & Under", "Boys 10 & Under",
  "Girls 10-13", "Boys 10-13", "Girls 11-13", "Boys 11-13", "Boys 14-19",
  "Men 17-29", "Men 20-29",
  "Women 30-39", "Men 30-39", "Women 40-49", "Men 40-49", "Women 50-59", "Men 50-59", "Men 60+",
  "Women E-Bike Open", "Men E-Bike Open",
];
const rank = (c: string) => {
  const i = classOrder.indexOf(c);
  return i === -1 ? classOrder.length : i;
};
for (const r of results) r.categories.sort((a, b) => rank(a.category) - rank(b.category));
