import React from "react";
import styled from "styled-components";

export interface NodeProps {
  distance: number;
  isChecked: boolean;
  isBlocked: boolean;
  isStartPoint: boolean;
  isEndPoint: boolean;
  isTrack: boolean;
  before: number[];
}

interface NodeFCProps {
  rowIdx: number;
  nodeIdx: number;
  node: NodeProps;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: NodeProps
  ) => void;
  handleMouseUp: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: NodeProps
  ) => void;
  handleMouseEnter: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: NodeProps
  ) => void;
  handleMouseLeave: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: NodeProps
  ) => void;
}

const Node = styled.div<NodeProps>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isBlocked
      ? "black"
      : props.isChecked && props.isTrack
      ? "yellow"
      : props.isChecked
      ? "tomato"
      : "whitesmoke"};
  transition: ${(props) =>
    props.isChecked ? "background 1s ease-in-out" : "none"};
`;

const Imoji = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const NodeFC: React.FC<NodeFCProps> = ({
  rowIdx,
  nodeIdx,
  node,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <Node
      id={`${rowIdx}-${nodeIdx}`}
      {...node}
      onMouseDown={(e) => handleMouseDown(e, node)}
      onMouseUp={(e) => handleMouseUp(e, node)}
      onMouseEnter={(e) => handleMouseEnter(e, node)}
      onMouseLeave={(e) => handleMouseLeave(e, node)}
    >
      {node.isStartPoint && <Imoji>🐮</Imoji>}
      {node.isEndPoint && <Imoji>💧</Imoji>}
    </Node>
  );
};

export default NodeFC;
