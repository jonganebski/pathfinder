import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Dijkstra from "../routes/Dijkstra";
import Header from "./Header";

// ----------- STYLED COMPONENTS -----------

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    "header header"
    "display control";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 70px auto;
`;

const Router = () => {
  return (
    <HashRouter>
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/dijkstra" component={Dijkstra} />
        </Switch>
      </Wrapper>
    </HashRouter>
  );
};

export default Router;
