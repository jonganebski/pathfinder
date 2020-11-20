import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Pathfinder from "../routes/Pathfinder";

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
          <Route exact path="/pathfinder" component={Pathfinder} />
        </Switch>
      </Wrapper>
    </HashRouter>
  );
};

export default Router;
