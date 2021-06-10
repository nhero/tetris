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
    const totalRows = border ? rows + 2 : rows;
    const totalColumns = columns ? columns + 2 : columns;
    
    for (let row = 0; row < totalRows; row++) {
      rowData.push(
        <div className="row" key={row}>{getCells(row, totalRows, totalColumns, )}</div>
      );
    }

    return <React.Fragment>{rowData}</React.Fragment>;
  }

  const getCells = (rowId: number, totalRows: number, totalColumns: number) => {
    let columnData: any = [];
    const colors: any = [
      'blank',
      'green',
      'red',
      'orange',
      'yellow',
      'light-blue',
      'dark-blue',
      'purple'
    ];
    
    for (let col = 0; col < totalColumns; col++) {
      let color;

      if (border) {
        if (
          rowId === 0 || 
          rowId === totalRows -1 ||
          col === 0 ||
          col === totalColumns -1
          ) {
          color = 'grey';
        }
        else {
          color = colors[Math.floor(Math.random() * colors.length)];
        }
      }
      
      const id = `${rowId}-${col}`;  
      columnData.push(<div className={`cell ${color}`} key={id}></div>);
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
