import { useState } from "react";
import "./Tetris.scss";
import Grid from "./../Grid/Grid";

import useKeypress from "../../hooks/useKeypress";
import useInterval from "../../hooks/useInterval";

//import IPiece from "./tetris.interface";
import tetriminoes from "./tetriminoes";
interface ITetris {
  grid: any;
  currentColumn: number;
  currentRow: number;
  refreshSpeed: number;
  currentPiece: Array<any>;
  previousPiece: Array<any>;
  gameOver: boolean;
  clearedRows: number;
  score: number;
  currentColumns?: Array<any>;
  maxRow?: any;
}

const Tetris = () => {
  const border = true;
  const rows = 20;
  const columns = 10;
  const totalRows = border ? rows + 2 : rows;
  const totalColumns = columns ? columns + 2 : columns;
  const initialColumn = 6;

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

  const movePiece = (rowId: number, columnId: number, tetris: ITetris) => {
    tetris.currentPiece.map((piece: any) => {
      piece.row = rowId + piece.rowOffset;
      piece.column = columnId + piece.columnOffset;
      tetris.grid[rowId + piece.rowOffset][columnId + piece.columnOffset] =
        piece.color;

      return {
        ...piece,
      };
    });

    tetris.currentColumns = [
      ...new Set(tetris.currentPiece.map((item: any) => item.column)),
    ];

    return tetris;
  };

  const removePiece = (rowId: number, columnId: any, tetris: ITetris) => {
    tetris.currentPiece.map((piece: any) => {
      if (rowId + piece.rowOffset >= 1 && rowId + piece.rowOffset <= 20)
        tetris.grid[rowId + piece.rowOffset][columnId + piece.columnOffset] =
          "blank";

      return {
        ...piece,
      };
    });

    return tetris;
  };

  const removePreviousPiece = (previousPiece: any, tetris: ITetris) => {
    previousPiece.map((piece: any) => {
      tetris.grid[piece.row][piece.column] = "blank";

      return {
        ...piece,
      };
    });

    return tetris;
  };

  const canMoveVertically = (
    tetris: ITetris,
    currentPiece: any,
    movedPiece: any,
    maxRow: number,
    nextRow: number
  ) => {
    let nonCollisionPieces = movedPiece.filter((piece: any) => {
      return !currentPiece.some(
        (item: any) => item.row === piece.row && item.column === piece.column
      );
    });

    const collision = nonCollisionPieces.map((piece: any) => {
      return {
        ...piece,
        hasCollision:
          tetris.grid[piece.row][piece.column] !== "blank" ? true : false,
      };
    });

    return collision.find((piece: any) => piece.hasCollision === true)
      ? false
      : true;
  };

  const movedPiece = (rowId: number, columnId: number, tetris: ITetris) => {
    const piece = tetris.currentPiece.map((piece: any) => {
      return {
        ...piece,
        row: rowId + piece.rowOffset,
        column: columnId + piece.columnOffset,
      };
    });

    return piece;
  };

  const getMax = (piece: any, field: string) => {
    if (piece.length) {
      return piece.reduce((prev: any, current: any) =>
        prev.field > current.field ? prev : current
      );
    } else {
      return 1;
    }
  };

  const getMaxQuickDropRow = (tetris: ITetris) => {
    tetris.currentColumns = [
      ...new Set(tetris.currentPiece.map((item: any) => item.column)),
    ];

    let minFinalRow = 20;
    tetris.currentColumns.forEach((columnId: number) => {
      const column = extractColumn(tetris.grid, columnId);
      const pieceMaxRow = getMax(tetris.currentPiece, "row").row;

      // get min collision rowId from column
      const firstCollisionRow = findFirstCollisionInColumn(pieceMaxRow, column);
      if (firstCollisionRow < minFinalRow) {
        minFinalRow = firstCollisionRow;
      }
    });
    // find how many rows tall the piece is
    const rows = [...new Set(tetris.currentPiece.map((item: any) => item.row))];
    const rowOffset = rows.length - 1;

    return minFinalRow - rowOffset;
  };

  const nextRow = () => {
    setTetris((tetris) => {
      if (tetris.gameOver) {
        return tetris;
      }
      let nextRow = tetris.currentRow + 1 <= 21 ? tetris.currentRow + 1 : 1;
      const previousPiece =
        tetris.currentRow === 1
          ? []
          : movedPiece(tetris.currentRow, tetris.currentColumn, tetris);
      const nextPiece = movedPiece(nextRow, tetris.currentColumn, tetris);
      const maxRow = getMax(nextPiece, "row");
      const canMove = canMoveVertically(
        tetris,
        previousPiece,
        nextPiece,
        maxRow,
        nextRow
      );

      if (maxRow.row >= 21) {
        nextRow = 1;
        tetris.currentPiece = getNextPiece();

        return {
          ...tetris,
          currentRow: nextRow,
        };
      } else {
        if (canMove) {
          tetris = removePreviousPiece(previousPiece, tetris);
          tetris = movePiece(nextRow, tetris.currentColumn, tetris);
        } else {
        }

        const maxRow = getMaxQuickDropRow(tetris);

        return {
          ...tetris,
          currentRow: nextRow,
          maxRow,
        };
      }
    });

    // check if rows cleared
    didClearRow();
  };

  useInterval(() => {
    nextRow();
  }, 100000);

  useKeypress("ArrowDown", () => {
    nextRow();
  });

  useKeypress("ArrowLeft", () => {
    setTetris((tetris) => {
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

      tetris = removePiece(tetris.currentRow, tetris.currentColumn, tetris);
      tetris = movePiece(tetris.currentRow, nextColumn, tetris);
      const maxRow = getMaxQuickDropRow(tetris);

      return {
        ...tetris,
        currentColumn: nextColumn,
        maxRow,
      };
    });
  });

  useKeypress("ArrowRight", () => {
    setTetris((tetris) => {
      let nextColumn =
        tetris.currentColumn === 10 ? 10 : tetris.currentColumn + 1;

      const maxColumnOffsetRight = tetris.currentPiece.reduce(
        (max: number, p: any) => (p.columnOffset > max ? p.columnOffset : max),
        tetris.currentPiece[0].columnOffset
      );

      if (maxColumnOffsetRight + nextColumn > 10) {
        nextColumn = nextColumn - maxColumnOffsetRight;
      }

      tetris = removePiece(tetris.currentRow, tetris.currentColumn, tetris);
      tetris = movePiece(tetris.currentRow, nextColumn, tetris);
      const maxRow = getMaxQuickDropRow(tetris);

      return {
        ...tetris,
        currentColumn: nextColumn,
        maxRow,
      };
    });
  });

  const extractColumn = (arr: any, column: number) =>
    arr.map((x: any) => x[column]);

  const findFirstCollisionInColumn = (
    pieceMaxRow: number,
    column: string[]
  ) => {
    const collision = column.findIndex(
      (cell, index) => cell !== "blank" && index >= pieceMaxRow + 1
    );

    return collision - 1;
  };

  const dropPiece = () => {
    setTetris((tetris) => {
      tetris = removePreviousPiece(tetris.currentPiece, tetris);
      tetris = movePiece(tetris.maxRow, tetris.currentColumn, tetris);

      return {
        ...tetris,
        currentRow: 1,
      };
    });

    // check if rows cleared
    didClearRow();
  };

  useKeypress(" ", () => {
    dropPiece();
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
    const pieceNumber: number = Math.floor(Math.random() * 7);

    return tetriminoes[pieceNumber];
  };

  const loadInitialGameState = () => {
    const tetris: ITetris = {
      grid: getInitialGrid(),
      currentColumn: initialColumn,
      currentRow: 1,
      currentPiece: getNextPiece(),
      previousPiece: [],
      refreshSpeed: 1000,
      gameOver: false,
      clearedRows: 0,
      score: 0,
      currentColumns: [],
      maxRow: 19,
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
