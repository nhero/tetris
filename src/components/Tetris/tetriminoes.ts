import IPiece from "./tetris.interface";

const tetriminoes: Array<Array<IPiece>> = [
  [
    // straight
    {
      column: 4,
      columnOffset: -2,
      row: 1,
      color: "light-blue",
    },
    {
      column: 5,
      columnOffset: -1,
      row: 1,
      color: "light-blue",
    },
    {
      column: 6,
      columnOffset: 0,
      row: 1,
      color: "light-blue",
    },
    {
      column: 7,
      columnOffset: 1,
      row: 1,
      color: "light-blue",
    },
  ],
  // square
  [
    {
      column: 5,
      columnOffset: -1,
      row: 1,
      color: "yellow",
    },
    {
      column: 6,
      columnOffset: 0,
      row: 1,
      color: "yellow",
    },
    {
      column: 5,
      columnOffset: -1,
      row: 2,
      color: "yellow",
    },
    {
      column: 6,
      columnOffset: 0,
      row: 2,
      color: "yellow",
    },
  ],
  // backwards L
  [
    {
      column: 4,
      columnOffset: -2,
      row: 1,
      color: "dark-blue",
    },
    {
      column: 4,
      columnOffset: -2,
      row: 2,
      color: "dark-blue",
    },
    {
      column: 5,
      columnOffset: -1,
      row: 2,
      color: "dark-blue",
    },
    {
      column: 6,
      columnOffset: 0,
      row: 2,
      color: "dark-blue",
    },
  ],
  // regular L
  [
    {
      column: 6,
      columnOffset: 0,
      row: 1,
      color: "orange",
    },
    {
      column: 4,
      columnOffset: -2,
      row: 2,
      color: "orange",
    },
    {
      column: 5,
      columnOffset: -1,
      row: 2,
      color: "orange",
    },
    {
      column: 6,
      columnOffset: 0,
      row: 2,
      color: "orange",
    },
  ],
  // T
  [
    {
      column: 5,
      columnOffset: -1,
      row: 1,
      color: "purple",
    },
    {
      column: 4,
      columnOffset: -2,
      row: 2,
      color: "purple",
    },
    {
      column: 5,
      columnOffset: -1,
      row: 2,
      color: "purple",
    },
    {
      column: 6,
      columnOffset: 0,
      row: 2,
      color: "purple",
    },
  ],
  // skew right
  [
    {
      column: 5,
      columnOffset: -1,
      row: 1,
      color: "green",
    },
    {
      column: 6,
      columnOffset: 0,
      row: 1,
      color: "green",
    },
    {
      column: 4,
      columnOffset: -2,
      row: 2,
      color: "green",
    },
    {
      column: 5,
      columnOffset: -1,
      row: 2,
      color: "green",
    },
  ],
  // skew left
  [
    {
      column: 4,
      columnOffset: -2,
      row: 1,
      color: "red",
    },
    {
      column: 5,
      columnOffset: -1,
      row: 1,
      color: "red",
    },
    {
      column: 5,
      columnOffset: -1,
      row: 2,
      color: "red",
    },
    {
      column: 6,
      columnOffset: 0,
      row: 2,
      color: "red",
    },
  ],
];

export default tetriminoes;
