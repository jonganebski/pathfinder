import React from "react";
import styled from "styled-components";
import { TStatus } from "../hooks/useStatus";

const Wrapper = styled.div`
  grid-area: control;
  background-color: steelblue;
`;

const Button = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 2rem;
  background-color: red;
  letter-spacing: 2px;
`;

interface IControlBoxProps {
  status: TStatus;
  setStatus: React.Dispatch<React.SetStateAction<TStatus>>;
  startDijkstra: () => void;
}

const ControlBox: React.FC<IControlBoxProps> = ({
  status,
  setStatus,
  startDijkstra,
}) => {
  return (
    <Wrapper>
      <Button
        disabled={status === "running"}
        onClick={() => {
          console.log("click");
          if (status === "initialized") {
            startDijkstra();
          } else if (status === "finished") {
            setStatus("initialized");
          }
        }}
      >
        {status === "initialized"
          ? "START"
          : status === "running"
          ? "RUNNING"
          : "RESUME"}
      </Button>
    </Wrapper>
  );
};

export default ControlBox;
