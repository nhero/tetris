import React from "react";
import "./Cell.scss";

interface ICellProps {
  color: string;
}

const Cell: React.FC<ICellProps> = ({ color }) => (
  <div className={`Cell ${color}`} data-testid="Cell"></div>
);

export default Cell;
