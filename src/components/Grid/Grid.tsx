import React from "react";
import "./Grid.scss";
import Cell from "../Cell/Cell";

interface IGridProps {
  grid: any;
}

const Grid: React.FC<IGridProps> = ({ grid }) => {
  const totalColumns = grid[0].length;
  const totalRows = grid.length;

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
      {getRows()}
    </div>
  );
};

export default Grid;
