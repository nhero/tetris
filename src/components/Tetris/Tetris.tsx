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
  gameOver: boolean;
}

const Tetris = () => {
  const border = true;
  const rows = 20;
  const columns = 10;
  const totalRows = border ? rows + 2 : rows;
  const totalColumns = columns ? columns + 2 : columns;

  useInterval(() => {
    setTetris((tetris) => {
      if (tetris.grid[tetris.currentRow][tetris.currentColumn] === "blank") {
        tetris.grid[tetris.currentRow][tetris.currentColumn] = "orange";
        // clear previous position
        if (tetris.currentRow > 1) {
          tetris.grid[tetris.currentRow - 1][tetris.currentColumn] = "blank";
        }
      }

      let nextRow = tetris.currentRow + 1 <= 20 ? tetris.currentRow + 1 : 1;
      // can't move to next row so reset
      if (
        tetris.grid[tetris.currentRow + 1][tetris.currentColumn] !== "blank"
      ) {
        nextRow = 1;
      }

      return {
        ...tetris,
        currentRow: nextRow,
      };
    });
  }, 1000);

  useKeypress("ArrowLeft", () => {
    setTetris((tetris) => {
      const nextColumn =
        tetris.currentColumn === 1 ? 1 : tetris.currentColumn - 1;
      tetris.grid[tetris.currentRow][tetris.currentColumn] = "blank";
      tetris.grid[tetris.currentRow][nextColumn] = "orange";

      return {
        ...tetris,
        currentColumn: nextColumn,
      };
    });
  });

  useKeypress("ArrowRight", () => {
    setTetris((tetris) => {
      const nextColumn =
        tetris.currentColumn === 10 ? 10 : tetris.currentColumn + 1;
      tetris.grid[tetris.currentRow][tetris.currentColumn] = "blank";
      tetris.grid[tetris.currentRow][nextColumn] = "orange";

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
    const piece = [
      {
        column: 6,
        row: 1,
        color: "orange",
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
      refreshSpeed: 1000,
      gameOver: false,
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
      <button onClick={newGame}>Start Over</button>
      <Grid grid={tetris.grid} />
    </div>
  );
};

export default Tetris;
