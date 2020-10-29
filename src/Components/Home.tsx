import React from "react";
import styled from "styled-components";
import { COLS, ROWS } from "../constants";
import { useField } from "../hooks/useField";

export interface ICellProps {
  isChecked: boolean;
  isBlocked: boolean;
  isStartPoint: boolean;
  isEndPoint: boolean;
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
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isStartPoint ? "red" : props.isEndPoint ? "blue" : "whitesmoke"};
`;

const Home = () => {
  const [field] = useField();

  console.log(field);

  return (
    <Grid>
      {field.map((row, rowIdx) =>
        row.map((cell, cellIdx) => (
          <Cell
            key={`${rowIdx}-${cellIdx}`}
            isChecked={cell.isChecked}
            isBlocked={cell.isBlocked}
            isStartPoint={cell.isStartPoint}
            isEndPoint={cell.isEndPoint}
          />
        ))
      )}
    </Grid>
  );
};

export default Home;
