import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: control;
  background-color: steelblue;
`;

interface IControlBoxProps {
  isInitialized: boolean;
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
  startDijkstra: () => void;
}

const ControlBox: React.FC<IControlBoxProps> = ({
  isInitialized,
  setIsInitialized,
  isRunning,
  startDijkstra,
}) => {
  return (
    <Wrapper>
      <button
        disabled={isRunning}
        onClick={() => {
          setIsInitialized(!isInitialized);
          if (isInitialized) {
            startDijkstra();
          }
        }}
      >
        {isInitialized ? "START" : isRunning ? "RUNNING" : "RESUME"}
      </button>
    </Wrapper>
  );
};

export default ControlBox;
