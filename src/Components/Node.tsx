import React from "react";
import styled from "styled-components";
import { NodeService, useNode } from "../hooks/useNode";
import { Status } from "../hooks/useStatus";

interface DivProps {
  isBlocked: boolean;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
}

const Div = styled.div<DivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isBlocked, isVisited, isPath }) =>
    isBlocked
      ? "black"
      : isPath
      ? "yellow"
      : isVisited
      ? "tomato"
      : "whitesmoke"};
  cursor: ${({ isStart, isEnd }) => (isStart || isEnd) && "pointer"};
  transition: ${({ isVisited }) =>
    isVisited && "background-color 0.3s ease-in-out"};
`;

interface NodeProps {
  grid: NodeService[][];
  NodeService: NodeService;
  movingStartPoint: boolean;
  setMovingStartPoint: React.Dispatch<React.SetStateAction<boolean>>;
  movingEndPoint: boolean;
  setMovingEndPoint: React.Dispatch<React.SetStateAction<boolean>>;
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>;
  lastStartNode: React.MutableRefObject<NodeService | undefined>;
  lastEndNode: React.MutableRefObject<NodeService | undefined>;
  status: Status;
  startDijkstra: () => Promise<void>;
}

const Node: React.FC<NodeProps> = ({
  grid,
  NodeService,
  setGrid,
  movingStartPoint,
  setMovingStartPoint,
  movingEndPoint,
  setMovingEndPoint,
  lastStartNode,
  lastEndNode,
  status,
  startDijkstra,
}) => {
  const { isBlocked, isVisited, isStart, isEnd, isPath } = NodeService;
  const mouseEventHandlers = useNode(
    grid,
    NodeService,
    movingStartPoint,
    setMovingStartPoint,
    movingEndPoint,
    setMovingEndPoint,
    setGrid,
    lastStartNode,
    lastEndNode,
    status,
    startDijkstra
  );
  return (
    <Div
      isBlocked={isBlocked}
      isVisited={isVisited}
      isStart={isStart}
      isEnd={isEnd}
      isPath={isPath}
      {...mouseEventHandlers}
    >
      {NodeService.getValue()}
    </Div>
  );
};

export default Node;
