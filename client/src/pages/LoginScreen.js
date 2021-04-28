import React, { useState } from "react";
import { LoginForm } from "../components/Users/LoginForm";
import { SignUpForm } from "../components/Users/SignUpForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as WilburImage } from "../assets/WilburImage.svg";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import { WilburStanding } from "../assets/wilburStanding";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.div``;

const SubHeading = styled.div``;

const FormContainer = styled.div``;

// const WilburImage = styled.div``;

const LoginScreen = () => {
  return (
    <Router>
      <Container>
        {/* <Page>
          <Grid>
            <GridColumn medium={7}></GridColumn>
            <GridColumn medium={5}> */}
        <Content>
          <WilburImage />
          <Switch>
            <Route path="/user/signup" component={SignUpForm} />
            <Route path="/user/login" component={LoginForm}></Route>
          </Switch>
        </Content>
        {/* </GridColumn>
          </Grid>
        </Page> */}
      </Container>
    </Router>
  );
};

export { LoginScreen };
