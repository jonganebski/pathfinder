import { useRef, useState } from "react";
import { START } from "../constants";
import { TCell } from "./useField";

export const useStartPoint = (): [
  number[],
  boolean,
  (cell: TCell) => void,
  (cell: TCell, id: string) => void
] => {
  const [startCoord, setStartCoord] = useState(START);
  const [isMovingStartPoint, setIsMovingStartPoint] = useState(false);

  const clickedStartPoint = useRef<TCell>();

  const startPointMouseDown = (cell: TCell) => {
    clickedStartPoint.current = cell;
    setIsMovingStartPoint(true);
  };

  const startPointMouseUp = (cell: TCell, id: string) => {
    const coord = id.split("-").map((el) => +el);
    setIsMovingStartPoint(false);
    if (!cell.isBlocked && !cell.isEndPoint && clickedStartPoint.current) {
      clickedStartPoint.current.isStartPoint = false;
      cell.isStartPoint = true;
      setStartCoord(coord);
    }
  };

  return [
    startCoord,
    isMovingStartPoint,
    startPointMouseDown,
    startPointMouseUp,
  ];
};
