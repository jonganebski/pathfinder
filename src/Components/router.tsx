import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { useStatus } from "../hooks/useStatus";
import Dijkstra from "../routes/Dijkstra";
import Header from "./Header";

// ----------- STYLED COMPONENTS -----------

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 70px auto;
`;

const Router = () => {
  return (
    <HashRouter>
      <Wrapper>
        <Switch>
          <Route exact path="/dijkstra">
            <Dijkstra />
          </Route>
        </Switch>
      </Wrapper>
    </HashRouter>
  );
};

export default Router;
