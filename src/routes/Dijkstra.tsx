import React from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import Node from "../Components/Node";
import { COLS, ROWS } from "../constants";
import { useAStar } from "../hooks/useAStar";
import { useDijkstra } from "../hooks/useDijkstra";
import { useGrid } from "../hooks/useGrid";
import { useStatus } from "../hooks/useStatus";

// ----------- STYLED COMPONENTS -----------

const Main = styled.main`
  margin: 50px 0px 50px 0px;
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${COLS}, minmax(10px, 22px));
  grid-template-rows: repeat(${ROWS}, minmax(10px, 22px));
  grid-gap: 1px;
  background-color: steelblue;
  border: 1px solid steelblue;
`;

// ----------- MAIN COMPONENTS -----------

interface DijkstraProps {}

const Dijkstra: React.FC<DijkstraProps> = () => {
  const {
    grid,
    setGrid,
    generateGrid,
    movingStartPoint,
    setMovingStartPoint,
    movingEndPoint,
    setMovingEndPoint,
    lastStartNode,
    lastEndNode,
  } = useGrid();
  const { status, setStatus, onClick } = useStatus(generateGrid);
  const { runDijkstra } = useDijkstra(grid, setGrid, status, setStatus);
  const { runAStar } = useAStar(grid, setGrid, status, setStatus);
  return (
    <>
      <Header
        status={status}
        setStatus={setStatus}
        onClick={onClick}
        // algorithmFn={runDijkstra}
        algorithmFn={runAStar}
      />
      <Main>
        <Grid
          onContextMenu={(e) => e.preventDefault()}
          onMouseLeave={() => {
            setMovingStartPoint(false);
            setMovingEndPoint(false);
          }}
        >
          {grid?.map((row) =>
            row.map((NodeService, colIdx) => (
              <Node
                key={colIdx}
                grid={grid}
                NodeService={NodeService}
                setGrid={setGrid}
                movingStartPoint={movingStartPoint}
                setMovingStartPoint={setMovingStartPoint}
                movingEndPoint={movingEndPoint}
                setMovingEndPoint={setMovingEndPoint}
                lastStartNode={lastStartNode}
                lastEndNode={lastEndNode}
                status={status}
                // runDijkstra={runDijkstra}
                runDijkstra={runAStar}
              />
            ))
          )}
        </Grid>
      </Main>
    </>
  );
};

export default Dijkstra;
