import React from "react";
import styled from "styled-components";
import { COLS, ROWS } from "../constants";

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
  return (
    <>
      <Main>
        <Grid>{}</Grid>
      </Main>
    </>
  );
};

export default Dijkstra;
