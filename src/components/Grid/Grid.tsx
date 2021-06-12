import React, { useState, useEffect } from "react";
import "./Grid.scss";
import Cell from "../Cell/Cell";

interface IGridProps {
  rows: number;
  columns: number;
  border: boolean;
}

const Grid: React.FC<IGridProps> = ({ rows, columns, border }) => {
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

  const [currentRow, setCurrentRow] = useState(border ? 1 : 0);
  const [currentColumn, setCurrentColumn] = useState(border ? 1 : 0);
  const [currentPiece, setCurrentPiece] = useState(getNextPiece());
  const [grid, setGrid] = useState(getInitialGrid());
  const [refreshSpeed, setRefreshSpeed] = useState(100);

  useEffect(() => {
    const handleEscape = (event: any) => {};
    window.addEventListener("keydown", handleEscape);

    const updateGrid = () => {
      setCurrentRow((currentRow) =>
        currentRow < totalRows - 2 ? currentRow + 1 : 1
      );
    };
    const newGrid = grid;
    if (currentRow > 1) {
      newGrid[currentRow - 1][currentColumn] = "blank";
    }

    newGrid[currentRow][currentColumn] = currentPiece;
    setGrid(grid);

    const interval = setInterval(() => {
      updateGrid();
    }, refreshSpeed);
    return () => clearInterval(interval);
  }, [currentRow, grid]);

  const getCells = (rowId: number) => {
    let columnData: any = [];
    for (let col = 0; col < totalColumns; col++) {
      const id = `${rowId}-${col}`;
      const color = grid[rowId][col];
      columnData.push(<Cell color={color} key={id} />);
    }

    return columnData;
  };

  const getRows = () => {
    let rowData = [];

    for (let row = 0; row < totalRows; row++) {
      rowData.push(
        <div className="row" key={row}>
          {getCells(row)}
        </div>
      );
    }

    return <React.Fragment>{rowData}</React.Fragment>;
  };

  return (
    <div className="Grid" data-testid="Grid">
      Grid Component
      {getRows()}
    </div>
  );
};

export default Grid;
