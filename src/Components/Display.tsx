import React from "react";
import styled from "styled-components";
import { COLS, ROWS } from "../constants";
import { ICellProps } from "./Home";

// ----------- INTERFACE -----------

interface IDisplayProps {
  field: ICellProps[][];
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => void;
  handleMouseUp: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => void;
  handleMouseEnter: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => void;
  handleMouseLeave: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: ICellProps
  ) => void;
}

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

// ----------- MAIN COMPONENTS -----------

const Display: React.FC<IDisplayProps> = ({
  field,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <Main>
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
              {cell.isEndPoint && <Imoji>💧</Imoji>}
            </Cell>
          ))
        )}
      </Grid>
    </Main>
  );
};

export default Display;
