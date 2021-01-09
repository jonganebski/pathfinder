import React, { useState } from "react";
import styled from "styled-components";
import ControlBox from "../Components/ControlBox";
import Node from "../Components/Node";
import { COLOR, COLS, ROWS } from "../constants";
import { useAStar } from "../hooks/useAStar";
import { useChooseAlgorithm } from "../hooks/useChooseAlgorithm";
import { useDijkstra } from "../hooks/useDijkstra";
import { useGrid } from "../hooks/useGrid";
import { useMaze } from "../hooks/useMaze";
import { useStatus } from "../hooks/useStatus";

// ----------- STYLED COMPONENTS -----------

const Main = styled.main`
  display: grid;
  grid-template-columns: 5fr 1fr;
`;

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  /* width: 100%; */
  display: grid;
  grid-template-columns: repeat(${COLS}, minmax(10px, 20px));
  grid-template-rows: repeat(${ROWS}, minmax(10px, 20px));
  grid-gap: 1px;
  background-color: ${COLOR.GRID_GAP};
  border: 1px solid ${COLOR.GRID_GAP};
`;

// ----------- MAIN COMPONENTS -----------

const Pathfinder = () => {
  const [isLoopDelay, setIsLoopDelay] = useState(true);
  const {
    grid,
    setGrid,
    initializeGrid,
    movingStartPoint,
    setMovingStartPoint,
    movingEndPoint,
    setMovingEndPoint,
    lastStartNode,
    lastEndNode,
  } = useGrid();
  const { status, setStatus, onClickStart, onClickInitialize } = useStatus(
    grid,
    setGrid,
    initializeGrid
  );
  const { runDijkstra } = useDijkstra(
    grid,
    setGrid,
    status,
    setStatus,
    isLoopDelay
  );
  const { runAStar } = useAStar(grid, setGrid, status, setStatus, isLoopDelay);
  const { generateMaze } = useMaze(setStatus, grid, setGrid, isLoopDelay);
  const { algorithm, setAlgorithm } = useChooseAlgorithm();

  const getAlgorithmFn = () => {
    if (algorithm === "AStar") {
      return runAStar;
    }
    if (algorithm === "Dijkstra") {
      return runDijkstra;
    }
  };

  return (
    <Main>
      <Container>
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
                algorithmFn={getAlgorithmFn()}
              />
            ))
          )}
        </Grid>
      </Container>
      <ControlBox
        status={status}
        setStatus={setStatus}
        onClickStart={onClickStart}
        onClickInitialize={onClickInitialize}
        algorithmFn={getAlgorithmFn()}
        generateMaze={generateMaze}
        setAlgorithm={setAlgorithm}
        setIsLoopDelay={setIsLoopDelay}
      />
    </Main>
  );
};

export default Pathfinder;
