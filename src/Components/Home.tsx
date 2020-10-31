import React, { cloneElement } from "react";
import styled from "styled-components";
import { useDijkstra } from "../hooks/useDijkstra";
import { useEndPoint } from "../hooks/useEndPoint";
import { useField } from "../hooks/useField";
import { useIsRunning } from "../hooks/useIsRunning";
import { useStartPoint } from "../hooks/useStartPoint";
import ControlBox from "./ControlBox";
import Display from "./Display";
import Header from "./Header";

// ----------- INTERFACE -----------

export interface ICellProps {
  isChecked: boolean;
  isBlocked: boolean;
  isStartPoint: boolean;
  isEndPoint: boolean;
  isTrack: boolean;
  before: number[];
}

// ----------- STYLED COMPONENTS -----------

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    "header header"
    "display control";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 10fr;
`;

// ----------- MAIN COMPONENT -----------

const Home = () => {
  // HOOKS
  const [field, setField, isInitialized, setIsInitialized] = useField();
  const [isRunning, setIsRunning] = useIsRunning();
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
  const [startDijkstra] = useDijkstra(
    startCoord,
    endCoord,
    field,
    setField,
    setIsRunning
  );

  // console.log(field);
  // console.log("isMovingEndPoint: ", isMovingEndPoint);
  // console.log("isMovingStartPoint: ", isMovingStartPoint);

  // FUNCTIONS
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
      cell.isBlocked = true;
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
    <Wrapper>
      <Header />
      <Display
        field={field}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <ControlBox
        isInitialized={isInitialized}
        setIsInitialized={setIsInitialized}
        isRunning={isRunning}
        startDijkstra={startDijkstra}
      />
    </Wrapper>
  );
};

export default Home;
