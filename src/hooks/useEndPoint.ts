import { useRef, useState } from "react";
import { ICellProps } from "../Components/Home";
import { END } from "../constants";
import { TCell } from "./useField";
import { TStatus } from "./useStatus";

export const useEndPoint = (
  field: ICellProps[][]
): [
  number[],
  boolean,
  (cell: TCell) => void,
  () => void,
  (cell: TCell, id: string, status: TStatus, startDijkstra: () => void) => void
] => {
  const [endCoord, setEndCoord] = useState(END);
  const [isMovingEndPoint, setIsMovingEndPoint] = useState(false);

  const clickedEndPoint = useRef<TCell | null>(null);

  const endPointMouseDown = (cell: TCell) => {
    clickedEndPoint.current = cell;
    setIsMovingEndPoint(true);
  };

  const endPointMouseUp = () => {
    setIsMovingEndPoint(false);
  };

  const endPointMouseEnter = (
    cell: TCell,
    id: string,
    status: TStatus,
    startDijkstra: () => void
  ) => {
    const coord = id.split("-").map((el) => +el);
    if (!cell.isBlocked && !cell.isEndPoint && clickedEndPoint.current) {
      clickedEndPoint.current.isEndPoint = false;
      cell.isEndPoint = true;
      clickedEndPoint.current = cell;
      setEndCoord(coord);
    }
    if (status === "finished") {
      field.forEach((row) =>
        row.forEach((cell) => {
          cell.isChecked = false;
          cell.isTrack = false;
          cell.before = [];
        })
      );
      startDijkstra();
    }
  };

  return [
    endCoord,
    isMovingEndPoint,
    endPointMouseDown,
    endPointMouseUp,
    endPointMouseEnter,
  ];
};
