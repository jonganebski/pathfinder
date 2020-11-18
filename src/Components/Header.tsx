import React from "react";
import styled from "styled-components";
import { Status } from "../hooks/useStatus";

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
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    algorithmFn: () => Promise<void>
  ) => void;
  algorithmFn: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({
  status,
  setStatus,
  onClick,
  algorithmFn,
}) => {
  return (
    <Wrapper>
      <Heading>PATH FINDING ALGORITHMS</Heading>
      <Button
        onClick={(e) => onClick(e, algorithmFn)}
        disabled={status === "running"}
      >
        {status === "initialized"
          ? "Start"
          : status === "running"
          ? "Running..."
          : "Initialize"}
      </Button>
    </Wrapper>
  );
};

export default Header;
