import React from "react";
import styled from "styled-components";
import { useDijkstra } from "../hooks/useDijkstra";
import { useEndPoint } from "../hooks/useEndPoint";
import { useField } from "../hooks/useField";
import { useStatus } from "../hooks/useStatus";
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
  grid-template-rows: 70px auto;
`;

// ----------- MAIN COMPONENT -----------

const Home = () => {
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
      startPointMouseUp();
    }
    if (isMovingEndPoint) {
      endPointMouseUp();
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
      }
      if (isMovingStartPoint) {
        startPointMouseEnter(cell, e.currentTarget.id);
      }
      if (isMovingEndPoint) {
        endPointMouseEnter(cell, e.currentTarget.id, status, startDijkstra);
      }
      setField([...field]);
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
        status={status}
        setStatus={setStatus}
        startDijkstra={startDijkstra}
      />
    </Wrapper>
  );
};

export default Home;
