// src/data/dummyRegions.js

const dummyRegions = [
  {
    id: 1,
    name: "North Region",
    nbd: 1245,
    bd: 870,
    categories: {
      nbd: { plastic: 500, chemical: 300, metal: 445 },
      bd: { cloth: 300, food: 400, paper: 170 },
    },
    subRegions: [
      {
        id: "NR-1",
        name: "Sub Region A",
        nbd: 300,
        bd: 200,
        categories: {
          nbd: { plastic: 120, chemical: 100, metal: 80 },
          bd: { cloth: 80, food: 90, paper: 30 },
        },
      },
      {
        id: "NR-2",
        name: "Sub Region B",
        nbd: 450,
        bd: 300,
        categories: {
          nbd: { plastic: 200, chemical: 150, metal: 100 },
          bd: { cloth: 100, food: 150, paper: 50 },
        },
      },
    ],
  },
  {
    id: 2,
    name: "South Region",
    nbd: 980,
    bd: 650,
    categories: {
      nbd: { plastic: 400, chemical: 280, metal: 300 },
      bd: { cloth: 200, food: 300, paper: 150 },
    },
    subRegions: [
      {
        id: "SR-1",
        name: "Sub Region C",
        nbd: 400,
        bd: 250,
        categories: {
          nbd: { plastic: 150, chemical: 120, metal: 130 },
          bd: { cloth: 70, food: 130, paper: 50 },
        },
      },
      {
        id: "SR-2",
        name: "Sub Region D",
        nbd: 580,
        bd: 400,
        categories: {
          nbd: { plastic: 250, chemical: 160, metal: 170 },
          bd: { cloth: 130, food: 170, paper: 100 },
        },
      },
    ],
  },
];

export default dummyRegions;
