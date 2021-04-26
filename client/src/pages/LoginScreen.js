import React, { useState } from "react";
import { LoginForm } from "../components/Users/LoginForm";
import { SignUpForm } from "../components/Users/SignUpForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { PagesContainer } from "./PagesContainer";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const LoginScreen = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/user/signup" component={SignUpForm} />
          <Route path="/user/login" component={LoginForm}></Route>
        </Switch>
      </Container>
    </Router>
  );
};

export { LoginScreen };
