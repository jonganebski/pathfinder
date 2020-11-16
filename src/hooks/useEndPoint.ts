import { useRef, useState } from "react";
import { NodeProps } from "../Components/Node";
import { END } from "../constants";
import { TStatus } from "./useStatus";

export const useEndPoint = (
  field: NodeProps[][]
): [
  number[],
  boolean,
  (node: NodeProps) => void,
  () => void,
  (
    node: NodeProps,
    id: string,
    status: TStatus,
    startDijkstra: () => void
  ) => void
] => {
  const [endCoord, setEndCoord] = useState(END);
  const [isMovingEndPoint, setIsMovingEndPoint] = useState(false);

  const clickedEndPoint = useRef<NodeProps | null>(null);

  const endPointMouseDown = (node: NodeProps) => {
    clickedEndPoint.current = node;
    setIsMovingEndPoint(true);
  };

  const endPointMouseUp = () => {
    setIsMovingEndPoint(false);
  };

  const endPointMouseEnter = (
    node: NodeProps,
    id: string,
    status: TStatus,
    startDijkstra: () => void
  ) => {
    const coord = id.split("-").map((el) => +el);
    if (!node.isBlocked && !node.isEndPoint && clickedEndPoint.current) {
      clickedEndPoint.current.isEndPoint = false;
      node.isEndPoint = true;
      clickedEndPoint.current = node;
      setEndCoord(coord);
    }
    if (status === "finished") {
      field.forEach((row) =>
        row.forEach((node) => {
          node.isChecked = false;
          node.isTrack = false;
          node.before = [];
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
