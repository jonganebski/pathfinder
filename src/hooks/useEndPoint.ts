import { useRef, useState } from "react";
import { END } from "../constants";
import { TCell } from "./useField";

export const useEndPoint = (): [
  number[],
  boolean,
  (cell: TCell) => void,
  (cell: TCell, id: string) => void
] => {
  const [endCoord, setEndCoord] = useState(END);
  const [isMovingEndPoint, setIsMovingEndPoint] = useState(false);

  const clickedEndPoint = useRef<TCell | null>(null);

  const endPointMouseDown = (cell: TCell) => {
    clickedEndPoint.current = cell;
    setIsMovingEndPoint(true);
  };

  const endPointMouseUp = (cell: TCell, id: string) => {
    const coord = id.split("-").map((el) => +el);
    setIsMovingEndPoint(false);
    if (!cell.isBlocked && !cell.isEndPoint && clickedEndPoint.current) {
      clickedEndPoint.current.isEndPoint = false;
      cell.isEndPoint = true;
      setEndCoord(coord);
    }
  };

  return [endCoord, isMovingEndPoint, endPointMouseDown, endPointMouseUp];
};
