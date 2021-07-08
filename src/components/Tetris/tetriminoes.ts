interface IAdjustablePiece {
  columnOffset: number;
  rowOffset: number;
  color: string;
}

const tetriminoes: Array<Array<IAdjustablePiece>> = [
  [
    // straight
    {
      columnOffset: -2,
      rowOffset: 0,
      color: "light-blue",
    },
    {
      columnOffset: -1,
      rowOffset: 0,
      color: "light-blue",
    },
    {
      columnOffset: 0,
      rowOffset: 0,
      color: "light-blue",
    },
    {
      columnOffset: 1,
      rowOffset: 0,
      color: "light-blue",
    },
  ],
  // square
  [
    {
      columnOffset: -1,
      rowOffset: 0,
      color: "yellow",
    },
    {
      columnOffset: 0,
      rowOffset: 0,
      color: "yellow",
    },
    {
      columnOffset: -1,
      rowOffset: 1,
      color: "yellow",
    },
    {
      columnOffset: 0,
      rowOffset: 1,
      color: "yellow",
    },
  ],
  // backwards L
  [
    {
      columnOffset: -2,
      rowOffset: 0,
      color: "dark-blue",
    },
    {
      columnOffset: -2,
      rowOffset: 1,
      color: "dark-blue",
    },
    {
      columnOffset: -1,
      rowOffset: 1,
      color: "dark-blue",
    },
    {
      columnOffset: 0,
      rowOffset: 1,
      color: "dark-blue",
    },
  ],
  // regular L
  [
    {
      columnOffset: 0,
      rowOffset: 0,
      color: "orange",
    },
    {
      columnOffset: -2,
      rowOffset: 1,
      color: "orange",
    },
    {
      columnOffset: -1,
      rowOffset: 1,
      color: "orange",
    },
    {
      columnOffset: 0,
      rowOffset: 1,
      color: "orange",
    },
  ],
  // T
  [
    {
      columnOffset: -1,
      rowOffset: 0,
      color: "purple",
    },
    {
      columnOffset: -2,
      rowOffset: 1,
      color: "purple",
    },
    {
      columnOffset: -1,
      rowOffset: 1,
      color: "purple",
    },
    {
      columnOffset: 0,
      rowOffset: 1,
      color: "purple",
    },
  ],
  // skew right
  [
    {
      columnOffset: -1,
      rowOffset: 0,
      color: "green",
    },
    {
      columnOffset: 0,
      rowOffset: 0,
      color: "green",
    },
    {
      columnOffset: -2,
      rowOffset: 1,
      color: "green",
    },
    {
      columnOffset: -1,
      rowOffset: 1,
      color: "green",
    },
  ],
  // skew left
  [
    {
      columnOffset: -2,
      rowOffset: 0,
      color: "red",
    },
    {
      columnOffset: -1,
      rowOffset: 0,
      color: "red",
    },
    {
      columnOffset: -1,
      rowOffset: 1,
      color: "red",
    },
    {
      columnOffset: 0,
      rowOffset: 1,
      color: "red",
    },
  ],
];

export default tetriminoes;
