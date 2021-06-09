import React from 'react';
import './Grid.scss';

interface IGridProps {
  rows: number;
  columns: number;
  border: boolean;
}

const Grid: React.FC<IGridProps> = ({ rows, columns, border }) => {
  const getRows = () => {
    let rowData = [];
    
    for (let row = 0; row < rows; row++) {
      rowData.push(
        <div className="row" key={row}>{getCells(row, columns)}</div>
      );
    }

    return <React.Fragment>{rowData}</React.Fragment>;
  }

  const getCells = (rowId: number, numCols: number) => {
    let columnData: any = [];
    let toggleClass;
    for (let col = 0; col < numCols; col++) {
      //toggleClass = rows[rowId][col] === false ? "off" : "on";
      // if (col % 2 === 0) {
      //   columnData.push(<div onClick={() => updateMatrix(rows[rowId][col], rowId, col)} className={`col shadow ${toggleClass}`}></div>);
      // } else {
      // }
      const id = `${rowId}-${col}`;  
      columnData.push(<div className={`cell ${toggleClass}`} key={id}></div>);

    }

    return columnData;
  }


  return (
  <div className="Grid" data-testid="Grid">
    Grid Component
    {getRows()}
  </div>
)
};

export default Grid;
