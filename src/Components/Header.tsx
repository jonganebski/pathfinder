import React from "react";
import styled from "styled-components";
import { Status } from "../hooks/useStatus";
import { Algorithm } from "../hooks/useChooseAlgorithm";

const Wrapper = styled.header`
  position: relative;
  background-color: teal;
`;

const Heading = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.7rem;
`;

const Button = styled.button``;

interface HeaderProps {
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

const Header: React.FC<HeaderProps> = ({
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
    <Wrapper>
      <Heading>PATH FINDING ALGORITHMS</Heading>
      <select onChange={onSelectChange} disabled={status === "running"}>
        <option value="">--Choose Algorithm--</option>
        <option value="Dijkstra">Dijkstra Algorithm</option>
        <option value="AStar">A* Algorithm</option>
      </select>
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
    </Wrapper>
  );
};

export default Header;
