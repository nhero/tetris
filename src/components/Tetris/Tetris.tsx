import React, { useState, useEffect } from "react";
import "./Tetris.scss";
import Grid from "./../Grid/Grid";

const Tetris = () => {
  const border = true;
  const rows = 20;
  const columns = 10;
  const totalRows = border ? rows + 2 : rows;
  const totalColumns = columns ? columns + 2 : columns;

  const getInitialCells = (
    rowId: number,
    totalRows: number,
    totalColumns: number
  ) => {
    let columnData: any = [];

    for (let col = 0; col < totalColumns; col++) {
      let color;

      if (border) {
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
    setCurrentRow(border ? 1 : 0);
    setCurrentColumn(border ? 6 : 0);
    setGrid(getInitialGrid());
    console.log("grid", grid);
    setGameOver(false);
    console.log("asdf", getInitialGrid());
  };

  const getInitialGrid = () => {
    let initialGrid = [];

    for (let row = 0; row < totalRows; row++) {
      initialGrid[row] = getInitialCells(row, totalRows, totalColumns);
    }

    return initialGrid;
  };

  const getNextPiece = () => {
    const piece = ["orange"];
    return piece;
  };

  const [gameOver, setGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(border ? 1 : 0);
  const [currentColumn, setCurrentColumn] = useState(border ? 6 : 0);
  //const [currentPiece, setCurrentPiece] = useState(getNextPiece());
  const currentPiece = getNextPiece();
  const [grid, setGrid] = useState(getInitialGrid());
  //const [refreshSpeed, setRefreshSpeed] = useState(100);
  const refreshSpeed = 100;
  const minColumnId = border ? 1 : 0;
  const maxColumnId = border ? columns : columns - 1;

  useEffect(() => {
    const handleKeys = (event: any) => {
      switch (event.keyCode) {
        case 37: // arrow left
          setCurrentColumn((currentColumn) =>
            currentColumn - 1 < minColumnId ? minColumnId : currentColumn - 1
          );
          break;
        case 39: // arrow right
          setCurrentColumn((currentColumn) => {
            const newColumnId = currentColumn + 1;
            return newColumnId > maxColumnId ? maxColumnId : currentColumn + 1;
          });
          break;
        default:
          return;
      }
    };
    window.addEventListener("keydown", handleKeys);
  }, []);

  const canShiftPieceVertically = (): boolean => {
    console.log("csv", currentRow, currentColumn);

    if (currentRow < totalRows - 2) {
      if (grid[currentRow + 1][currentColumn] !== "blank") {
        // check if no blocks in next row
        if (currentRow === 1) {
          setGameOver(true);
          return false;
        }
        return true;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const shiftPieceVertically = () => {};

  const canShiftPieceHorizontally = () => {
    if ()
  };

  const shiftPieceHorizontally = () => {};

  useEffect(() => {
    const updateGridRow = () => {
      setCurrentRow((currentRow) => {
        if (currentRow < totalRows - 2) {
          if (grid[currentRow + 1][currentColumn] !== "blank") {
            // check if no blocks in next row
            if (currentRow === 1) {
              setGameOver(true);
              return 1;
            }
            return 1;
          } else {
            return currentRow < totalRows - 2 ? currentRow + 1 : 1;
          }
        } else {
          return 1;
        }
      });
      //setCurrentPiece(getNextPiece());
      //setRefreshSpeed(100);
      //console.log("cur row", currentRow);

      const newGrid = grid;
      if (currentRow > 1) {
        newGrid[currentRow - 1][currentColumn] = "blank";
      }

      newGrid[currentRow][currentColumn] = currentPiece;
      setGrid(grid);
    };

    const interval = setInterval(() => {
      updateGridRow();
    }, refreshSpeed);
    return () => clearInterval(interval);
  }, [currentRow]);

  // const updateGridColumn = () => {
  //   setCurrentRow((currentRow) => {
  //     console.log("current Row");
  //     if (currentRow < totalColumns - 2) {
  //       if (grid[currentRow][currentColumn] !== "blank") {
  //         return 1;
  //       } else {
  //         return currentRow < totalRows - 2 ? currentRow + 1 : 1;
  //       }
  //     } else {
  //       return 1;
  //     }
  //   });
  // };

  return (
    <div
      className={`Tetris ${gameOver ? "game-over" : ""}`}
      data-testid="Tetris"
    >
      Current Column: {currentColumn} <br />
      Current Row: {currentRow} <br />
      <button onClick={newGame}>Start Over</button>
      <Grid grid={grid} />
    </div>
  );
};

export default Tetris;
