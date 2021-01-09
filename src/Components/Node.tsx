import React from "react";
import styled from "styled-components";
import { COLOR } from "../constants";
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
  margin: ${({ isBlocked }) => (isBlocked ? "-1px" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isBlocked, isVisited, isPath }) =>
    isBlocked
      ? COLOR.BLOCK
      : isPath
      ? COLOR.PATH
      : isVisited
      ? COLOR.VISITED
      : COLOR.NODE};
  cursor: ${({ isStart, isEnd }) => (isStart || isEnd) && "pointer"};

  transition: ${({ isVisited }) =>
    isVisited && "background-color 0.3s ease-in-out"};
`;

const Span = styled.span`
  z-index: 10;
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
  algorithmFn: (() => Promise<void>) | undefined;
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
  algorithmFn,
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
    algorithmFn
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
      <Span role="img" aria-label="imoji">
        {NodeService.getValue()}
      </Span>
    </Div>
  );
};

export default Node;
