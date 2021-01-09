import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Pathfinder from "../routes/Pathfinder";
import Header from "./Header";

// ----------- STYLED COMPONENTS -----------

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 50px auto;
`;

const Router = () => {
  return (
    <HashRouter>
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/pathfinder" component={Pathfinder} />
        </Switch>
      </Wrapper>
    </HashRouter>
  );
};

export default Router;
