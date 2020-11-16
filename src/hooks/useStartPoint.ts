import { useRef, useState } from "react";
import { NodeProps } from "../Components/Node";
import { START } from "../constants";

export const useStartPoint = (): [
  number[],
  boolean,
  (node: NodeProps) => void,
  () => void,
  (node: NodeProps, id: string) => void
] => {
  const [startCoord, setStartCoord] = useState(START);
  const [isMovingStartPoint, setIsMovingStartPoint] = useState(false);

  const clickedStartPoint = useRef<NodeProps>();

  const startPointMouseDown = (node: NodeProps) => {
    clickedStartPoint.current = node;
    setIsMovingStartPoint(true);
  };

  const startPointMouseUp = () => {
    setIsMovingStartPoint(false);
  };

  const startPointMouseEnter = (node: NodeProps, id: string) => {
    const coord = id.split("-").map((el) => +el);
    if (!node.isBlocked && !node.isEndPoint && clickedStartPoint.current) {
      clickedStartPoint.current.isStartPoint = false;
      node.isStartPoint = true;
      clickedStartPoint.current = node;
      setStartCoord(coord);
    }
  };

  return [
    startCoord,
    isMovingStartPoint,
    startPointMouseDown,
    startPointMouseUp,
    startPointMouseEnter,
  ];
};
