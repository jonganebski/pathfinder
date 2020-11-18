import { useEffect, useRef, useState } from "react";
import { START_IDX, END_IDX, ROWS, COLS } from "../constants";
import { NodeService } from "./useNode";

export const useGrid = () => {
  const [grid, setGrid] = useState<NodeService[][]>([]);
  const [movingStartPoint, setMovingStartPoint] = useState(false);
  const [movingEndPoint, setMovingEndPoint] = useState(false);

  const lastStartNode = useRef<NodeService>();
  const lastEndNode = useRef<NodeService>();

  const generateGrid = () => {
    const baseArray: number[][] = Array(ROWS).fill(Array(COLS).fill(0));
    const grid = baseArray.map((row, rowIdx) =>
      row.map((_, colIdx) => new NodeService(rowIdx, colIdx))
    );
    grid[START_IDX[0]][START_IDX[1]].isStart = true;
    grid[END_IDX[0]][END_IDX[1]].isEnd = true;
    setGrid(grid);
  };

  useEffect(() => {
    generateGrid();
  }, []);

  return {
    grid,
    setGrid,
    generateGrid,
    movingStartPoint,
    setMovingStartPoint,
    movingEndPoint,
    setMovingEndPoint,
    lastStartNode,
    lastEndNode,
  };
};
