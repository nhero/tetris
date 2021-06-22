import { useState } from "react";
import "./Tetris.scss";
import Grid from "./../Grid/Grid";

import useKeypress from "../../hooks/useKeypress";
import useInterval from "../../hooks/useInterval";

// eslint-disable-next-line
interface IPiece {
  column: number;
  row: number;
  color: string;
}

interface ITetris {
  grid: any;
  currentColumn: number;
  currentRow: number;
  refreshSpeed: number;
  currentPiece: any;
  previousPiece: any;
  gameOver: boolean;
  clearedRows: number;
  score: number;
}

const Tetris = () => {
  const border = true;
  const rows = 20;
  const columns = 10;
  const totalRows = border ? rows + 2 : rows;
  const totalColumns = columns ? columns + 2 : columns;
  const colors = [
    "green",
    "red",
    "yellow",
    "light-blue",
    "dark-blue",
    "orange",
    "purple",
  ];

  const didClearRow = () => {
    setTetris((tetris) => {
      const clearedRows = [];
      for (let index = 1; index <= 20; index++) {
        if (!tetris.grid[index].includes("blank")) {
          clearedRows.push(index);
        }
      }
      if (clearedRows.length) {
        tetris.clearedRows = tetris.clearedRows + clearedRows.length;
        for (let index = 20; index >= 1; index--) {
          if (index > clearedRows.length) {
            tetris.grid[index] = [...tetris.grid[index - clearedRows.length]];
          } else {
            tetris.grid[index] = [
              "grey",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "grey",
            ];
          }
        }
      }

      return {
        ...tetris,
      };
    });
  };

  const nextRow = () => {
    setTetris((tetris) => {
      if (tetris.gameOver) {
        return tetris;
      }

      let nextRow = tetris.currentRow + 1 <= 21 ? tetris.currentRow + 1 : 1;

      if (nextRow !== 1) {
        tetris.previousPiece.map((piece: any) => {
          tetris.grid[tetris.currentRow][
            tetris.currentColumn + piece.columnOffset
          ] = "blank";

          return {
            ...piece,
          };
        });

        // clear previous position
        if (tetris.currentRow > 1) {
          tetris.currentPiece.map((piece: any) => {
            tetris.grid[tetris.currentRow - 1][piece.column] = "blank";

            return {
              ...piece,
            };
          });
        }
      }

      if (tetris.grid[tetris.currentRow][tetris.currentColumn] === "blank") {
        tetris.currentPiece.map((piece: any) => {
          tetris.grid[tetris.currentRow][
            tetris.currentColumn + piece.columnOffset
          ] = piece.color;

          return {
            ...piece,
            currentColumn: tetris.currentRow,
          };
        });
      }

      if (
        tetris.grid[nextRow][tetris.currentColumn] !== "blank" &&
        tetris.currentRow === 1
      ) {
        tetris.gameOver = true;
      }
      // can't move to next row so reset row
      else if (tetris.grid[nextRow][tetris.currentColumn] !== "blank") {
        nextRow = 1;
      }

      return {
        ...tetris,
        currentRow: nextRow,
      };
    });

    // check if rows cleared
    didClearRow();
  };

  useInterval(() => {
    nextRow();
  }, 500);

  useKeypress("ArrowDown", () => {
    nextRow();
  });

  useKeypress("ArrowLeft", () => {
    setTetris((tetris) => {
      tetris.previousPiece = tetris.currentPiece.map((piece: any) => {
        tetris.grid[tetris.currentRow][
          tetris.currentColumn + piece.columnOffset
        ] = "blank";
        return {
          ...piece,
        };
      });

      let nextColumn =
        tetris.currentColumn === 1 ? 1 : tetris.currentColumn - 1;
      const minColumnOffsetLeft =
        tetris.currentPiece.reduce(
          (min: number, p: any) =>
            p.columnOffset < min ? p.columnOffset : min,
          tetris.currentPiece[0].columnOffset
        ) *
          -1 +
        1;

      if (minColumnOffsetLeft > nextColumn) {
        nextColumn = minColumnOffsetLeft;
      }

      tetris.currentPiece.map((piece: any) => {
        tetris.grid[tetris.currentRow][nextColumn + piece.columnOffset] =
          piece.color;
        piece.column = nextColumn + piece.columnOffset;

        return {
          ...piece,
          currentColumn: nextColumn + piece.columnOffset,
        };
      });

      return {
        ...tetris,
        currentColumn: nextColumn,
      };
    });
  });

  useKeypress("ArrowRight", () => {
    setTetris((tetris) => {
      tetris.currentPiece.map((piece: any) => {
        tetris.grid[tetris.currentRow][
          tetris.currentColumn + piece.columnOffset
        ] = "blank";

        return {
          ...piece,
        };
      });

      const nextColumn =
        tetris.currentColumn === 10 ? 10 : tetris.currentColumn + 1;

      tetris.currentPiece.map((piece: any) => {
        tetris.grid[tetris.currentRow][nextColumn + piece.columnOffset] =
          piece.color;
        piece.column = nextColumn + piece.columnOffset;

        return {
          ...piece,
          currentColumn: nextColumn + piece.columnOffset,
        };
      });

      return {
        ...tetris,
        currentColumn: nextColumn,
      };
    });
  });

  const getInitialCells = (
    rowId: number,
    totalRows: number,
    totalColumns: number,
    hasBorder = border
  ) => {
    let columnData: any = [];

    for (let col = 0; col < totalColumns; col++) {
      let color;

      if (hasBorder) {
        if (
          rowId === 0 ||
          rowId === totalRows - 1 ||
          col === 0 ||
          col === totalColumns - 1
        ) {
          color = "grey";
        } else {
          color = "blank";
        }
      }

      columnData.push(color);
    }

    return columnData;
  };

  const newGame = () => {
    setTetris(loadInitialGameState());
  };

  const getInitialGrid = (hasBorder = border) => {
    let initialGrid = [];

    for (let row = 0; row < totalRows; row++) {
      initialGrid[row] = getInitialCells(
        row,
        totalRows,
        totalColumns,
        hasBorder
      );
    }

    return initialGrid;
  };

  const getNextPiece = () => {
    const colorNumber: number = Math.floor(Math.random() * 6);
    const piece = [
      {
        column: 6,
        columnOffset: 0,
        row: 1,
        color: colors[colorNumber],
      },
      {
        column: 5,
        columnOffset: -1,
        row: 1,
        color: colors[colorNumber],
      },
    ];

    return piece;
  };

  const loadInitialGameState = () => {
    const tetris: ITetris = {
      grid: getInitialGrid(),
      currentColumn: 6,
      currentRow: 1,
      currentPiece: getNextPiece(),
      previousPiece: [],
      refreshSpeed: 1000,
      gameOver: false,
      clearedRows: 0,
      score: 0,
    };

    return tetris;
  };

  const [tetris, setTetris] = useState(loadInitialGameState());

  return (
    <div
      className={`Tetris ${tetris.gameOver ? "game-over" : ""}`}
      data-testid="Tetris"
    >
      Current Column: {tetris.currentColumn} <br />
      Current Row: {tetris.currentRow} <br />
      Current Rows: {tetris.clearedRows} <br />
      <button onClick={newGame}>Start Over</button>
      <Grid grid={tetris.grid} />
    </div>
  );
};

export default Tetris;
