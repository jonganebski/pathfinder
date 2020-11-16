import React from "react";
import styled from "styled-components";
import { COLS, ROWS } from "../constants";
import { useDijkstra } from "../hooks/useDijkstra";
import { useEndPoint } from "../hooks/useEndPoint";
import { useField } from "../hooks/useField";
import { useStartPoint } from "../hooks/useStartPoint";
import { useStatus } from "../hooks/useStatus";
import ControlBox from "../Components/ControlBox";
import NodeFC, { NodeProps } from "../Components/Node";

// ----------- STYLED COMPONENTS -----------

const Main = styled.main`
  grid-area: display;
  margin: 50px 0px 50px 0px;
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  width: 50vw;
  height: calc(50vw * (${ROWS / COLS}));
  display: grid;
  grid-template-columns: repeat(${COLS}, auto);
  grid-template-rows: repeat(${ROWS}, auto);
  grid-gap: 1px;
  background-color: steelblue;
  border: 1px solid steelblue;
`;

// ----------- MAIN COMPONENTS -----------

const Dijkstra = () => {
  // HOOKS
  const [status, setStatus] = useStatus();
  const [field, setField] = useField(status);
  const [
    startCoord,
    isMovingStartPoint,
    startPointMouseDown,
    startPointMouseUp,
    startPointMouseEnter,
  ] = useStartPoint();
  const [
    endCoord,
    isMovingEndPoint,
    endPointMouseDown,
    endPointMouseUp,
    endPointMouseEnter,
  ] = useEndPoint(field);
  const [startDijkstra] = useDijkstra(
    startCoord,
    endCoord,
    field,
    setField,
    status,
    setStatus
  );

  // FUNCTIONS
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: NodeProps
  ) => {
    e.preventDefault();
    if (node.isStartPoint) {
      startPointMouseDown(node);
    }
    if (node.isEndPoint) {
      endPointMouseDown(node);
    }
    if (!node.isStartPoint && !node.isEndPoint) {
      node.isBlocked = true;
    }
    setField([...field]);
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: NodeProps
  ) => {
    if (isMovingStartPoint) {
      startPointMouseUp();
    }
    if (isMovingEndPoint) {
      endPointMouseUp();
    }
    setField([...field]);
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: NodeProps
  ) => {
    if (e.buttons === 1) {
      if (
        !isMovingStartPoint &&
        !isMovingEndPoint &&
        !node.isStartPoint &&
        !node.isEndPoint
      ) {
        node.isBlocked = true;
      }
      if (isMovingStartPoint) {
        startPointMouseEnter(node, e.currentTarget.id);
      }
      if (isMovingEndPoint) {
        endPointMouseEnter(node, e.currentTarget.id, status, startDijkstra);
      }
      setField([...field]);
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: NodeProps
  ) => {};

  return (
    <>
      <Main>
        <Grid>
          {field.map((row, rowIdx) =>
            row.map((node, nodeIdx) => (
              <NodeFC
                key={`${rowIdx}-${nodeIdx}`}
                rowIdx={rowIdx}
                nodeIdx={nodeIdx}
                node={node}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            ))
          )}
        </Grid>
      </Main>
      <ControlBox
        status={status}
        setStatus={setStatus}
        startDijkstra={startDijkstra}
      />
    </>
  );
};

export default Dijkstra;
