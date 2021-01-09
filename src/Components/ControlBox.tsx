import React from "react";
import { Status } from "../hooks/useStatus";
import { Algorithm } from "../hooks/useChooseAlgorithm";
import styled from "styled-components";

const Container = styled.section``;

const Button = styled.button`
  width: 120px;
`;

const Select = styled.select`
  display: block;
  width: 200px;
  height: 1.6rem;
  padding-left: 10px;
`;

interface ControlBoxProps {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  onClickStart: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    algorithmFn: (() => Promise<void>) | undefined
  ) => void;
  onClickInitialize: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  algorithmFn: (() => Promise<void>) | undefined;
  generateMaze: () => Promise<void>;
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
  setIsLoopDelay: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlBox: React.FC<ControlBoxProps> = ({
  status,
  setStatus,
  onClickStart,
  onClickInitialize,
  algorithmFn,
  generateMaze,
  setAlgorithm,
  setIsLoopDelay,
}) => {
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    if (value === "Dijkstra" || value === "AStar") {
      setAlgorithm(value);
    }
  };
  return (
    <Container>
      <Select onChange={onSelectChange} disabled={status === "running"}>
        <option value="">--- Choose Algorithm ---</option>
        <option value="Dijkstra">Dijkstra Algorithm</option>
        <option value="AStar">A* Algorithm</option>
      </Select>
      <Button
        onClick={(e) => onClickStart(e, algorithmFn)}
        disabled={status === "running"}
      >
        {status === "running"
          ? "Running..."
          : status === "finished"
          ? "clean the path"
          : "Start"}
      </Button>
      <Button onClick={onClickInitialize} disabled={status === "running"}>
        Initialize
      </Button>
      <Button onClick={generateMaze} disabled={status === "running"}>
        {status === "running" ? "Running..." : "Generate Maze"}
      </Button>
      <div>
        <input
          type="checkbox"
          id="instant"
          disabled={status === "running"}
          onChange={() => setIsLoopDelay((prev) => !prev)}
        />
        <label htmlFor="instant">Instant</label>
      </div>
    </Container>
  );
};

export default ControlBox;
