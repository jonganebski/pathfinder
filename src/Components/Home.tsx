import React, { cloneElement } from "react";
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
  background-color: ${(props) => (props.isChecked ? "tomato" : "whitesmoke")};
`;

const Imoji = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Home = () => {
  const [field] = useField();
  const [startCoord] = useStartPoint();
  const [endCoord] = useEndPoint();
  const [foo] = useDijkstra(startCoord, endCoord, field);

  console.log(field);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => {
    if (cell.isStartPoint) {
      console.log(cell.isStartPoint);
    }
    if (cell.isEndPoint) {
    }
    if (!cell.isStartPoint && !cell.isEndPoint) {
    }
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => {
    console.log(cell.isStartPoint);
  };

  return (
    <>
      <button>START</button>
      <Grid>
        {field.map((row, rowIdx) =>
          row.map((cell, cellIdx) => (
            <Cell
              key={`${rowIdx}-${cellIdx}`}
              isChecked={cell.isChecked}
              isBlocked={cell.isBlocked}
              isStartPoint={cell.isStartPoint}
              isEndPoint={cell.isEndPoint}
              before={cell.before}
              onMouseDown={(e) => handleMouseDown(e, cell)}
              onMouseUp={(e) => handleMouseUp(e, cell)}
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
