import React from "react";
import { reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";
import Router from "./Components/router";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
