import React, { useState } from "react";
import { LoginForm } from "../components/Users/LoginForm";
import { SignUpForm } from "../components/Users/SignUpForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
// import { ReactComponent as WilburImage } from "../assets/WilburImage.svg";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import { Header } from "@atlaskit/side-navigation";
import { PagesContainer } from "./PagesContainer";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const WilburImage = styled.img`
  position: absolute;
  left: 0vh;
  height: 65vh;
`;

const ParentContentContainer = styled.div`
  position: absolute;
  right: 15vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ChildContentContainer = styled.div`
  flex-direction: column;
  height: auto;
  padding: 20px;
`;

const Heading = styled.div`
  font-size: 32px;
  font-weight: 700;
  display: block;
`;

const SubHeading = styled.div`
  display: block;
  font-size: 18px;
  margin-bottom: 32px;
`;

const FormContainer = styled.div``;

const LoginScreen = () => {
  const [documentId, setDocumentId] = useState("");

  return (
    <Router>
      <Container>
        <WilburImage src="../assets/WilburImage.svg" />
        <ParentContentContainer>
          <ChildContentContainer>
            <Heading>Wilbur</Heading>
            <SubHeading>Beautifully simple notes</SubHeading>
            <Switch>
              <Route
                exact
                path="/user/signup"
                component={SignUpForm}
                setDocumentId={setDocumentId}
              />
              <Route exact path="/user/login" component={LoginForm} />
            </Switch>
          </ChildContentContainer>
        </ParentContentContainer>
      </Container>
    </Router>
  );
};

export { LoginScreen };
