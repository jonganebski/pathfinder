import React from "react";
import styled from "styled-components";
import { NodeService, useNode } from "../hooks/useNode";

interface DivProps {
  isBlocked: boolean;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
}

const Div = styled.div<DivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isBlocked, isVisited }) =>
    isBlocked ? "black" : isVisited ? "tomato" : "whitesmoke"};
  cursor: ${({ isStart, isEnd }) => (isStart || isEnd) && "pointer"};
`;

interface NodeProps {
  NodeService: NodeService;
  movingStartPoint: boolean;
  setMovingStartPoint: React.Dispatch<React.SetStateAction<boolean>>;
  movingEndPoint: boolean;
  setMovingEndPoint: React.Dispatch<React.SetStateAction<boolean>>;
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>;
  lastStartNode: React.MutableRefObject<NodeService | undefined>;
  lastEndNode: React.MutableRefObject<NodeService | undefined>;
}

const Node: React.FC<NodeProps> = ({
  NodeService,
  setGrid,
  movingStartPoint,
  setMovingStartPoint,
  movingEndPoint,
  setMovingEndPoint,
  lastStartNode,
  lastEndNode,
}) => {
  const { isBlocked, isVisited, isStart, isEnd } = NodeService;
  const mouseEventHandlers = useNode(
    NodeService,
    movingStartPoint,
    setMovingStartPoint,
    movingEndPoint,
    setMovingEndPoint,
    setGrid,
    lastStartNode,
    lastEndNode
  );
  return (
    <Div
      isBlocked={isBlocked}
      isVisited={isVisited}
      isStart={isStart}
      isEnd={isEnd}
      {...mouseEventHandlers}
    >
      {NodeService.getValue()}
    </Div>
  );
};

export default Node;
