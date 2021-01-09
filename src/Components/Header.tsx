import React from "react";
import styled from "styled-components";

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

const Header = () => {
  return (
    <Wrapper>
      <Heading>PATH FINDING ALGORITHMS</Heading>
    </Wrapper>
  );
};

export default Header;
