import React, { cloneElement, useState } from "react";
import styled from "styled-components";
import { COLS, ROWS } from "../constants";
import { useDijkstra } from "../hooks/useDijkstra";
import { useEndPoint } from "../hooks/useEndPoint";
import { useField } from "../hooks/useField";
import { useStartPoint } from "../hooks/useStartPoint";

export interface ICellProps {
  isChecked: boolean;
  isBlocked: boolean;
  isStartPoint: boolean;
  isEndPoint: boolean;
  isTrack: boolean;
  before: number[];
}

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

const Cell = styled.div<ICellProps>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isChecked && props.isTrack
      ? "yellow"
      : props.isBlocked
      ? "black"
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

const Home = () => {
  const [field, setField] = useField();
  const [
    startCoord,
    isMovingStartPoint,
    startPointMouseDown,
    startPointMouseUp,
  ] = useStartPoint();
  const [
    endCoord,
    isMovingEndPoint,
    endPointMouseDown,
    endPointMouseUp,
  ] = useEndPoint();
  const [startDijkstra] = useDijkstra(startCoord, endCoord, field, setField);

  // console.log(field);
  // console.log("isMovingEndPoint: ", isMovingEndPoint);
  // console.log("isMovingStartPoint: ", isMovingStartPoint);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => {
    e.preventDefault();
    if (cell.isStartPoint) {
      startPointMouseDown(cell);
    }
    if (cell.isEndPoint) {
      endPointMouseDown(cell);
    }
    if (!cell.isStartPoint && !cell.isEndPoint) {
    }
    setField([...field]);
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => {
    if (isMovingStartPoint) {
      startPointMouseUp(cell, e.currentTarget.id);
    }
    if (isMovingEndPoint) {
      endPointMouseUp(cell, e.currentTarget.id);
    }
    setField([...field]);
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => {
    if (e.buttons === 1) {
      if (
        !isMovingStartPoint &&
        !isMovingEndPoint &&
        !cell.isStartPoint &&
        !cell.isEndPoint
      ) {
        cell.isBlocked = true;
        setField([...field]);
      }
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => {};

  return (
    <>
      <button onClick={startDijkstra}>START</button>
      <Grid>
        {field.map((row, rowIdx) =>
          row.map((cell, cellIdx) => (
            <Cell
              key={`${rowIdx}-${cellIdx}`}
              id={`${rowIdx}-${cellIdx}`}
              isChecked={cell.isChecked}
              isBlocked={cell.isBlocked}
              isStartPoint={cell.isStartPoint}
              isEndPoint={cell.isEndPoint}
              isTrack={cell.isTrack}
              before={cell.before}
              onMouseDown={(e) => handleMouseDown(e, cell)}
              onMouseUp={(e) => handleMouseUp(e, cell)}
              onMouseEnter={(e) => handleMouseEnter(e, cell)}
              onMouseLeave={(e) => handleMouseLeave(e, cell)}
            >
              {cell.isStartPoint && <Imoji>🐮</Imoji>}
              {cell.isEndPoint && <Imoji>🌳</Imoji>}
            </Cell>
          ))
        )}
      </Grid>
    </>
  );
};

export default Home;
