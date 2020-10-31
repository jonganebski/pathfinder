import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: control;
  background-color: steelblue;
`;

interface IControlBoxProps {
  startDijkstra: () => void;
}

const ControlBox: React.FC<IControlBoxProps> = ({ startDijkstra }) => {
  return (
    <Wrapper>
      <button onClick={startDijkstra}>START</button>
    </Wrapper>
  );
};

export default ControlBox;
