import React, { useState } from "react";
import { LoginForm } from "../components/Users/LoginForm";
import { SignUpForm } from "../components/Users/SignUpForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as WilburImage } from "../assets/WilburImage.svg";
import { ReactComponent as WilburImage2 } from "../assets/WilburImage2.svg";
// import { ReactComponent as PagesMan } from "../assets/PagesMan.svg";

import Page, { Grid, GridColumn } from "@atlaskit/page";
import { Header } from "@atlaskit/side-navigation";
import { PagesContainer } from "./PagesContainer";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
`;

// const WilburImage = styled.img`
//   position: absolute;
//   left: 0vh;
//   height: 65vh;
// `;

const ImageContainer = styled.div`
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

// src="../assets/WilburImage.svg"

const FormContainer = styled.div``;

const LoginScreen = (props) => {
  return (
    <Container>
      {/* <ImageContainer> */}
      {/* <WilburImage /> */}
      <WilburImage2 />
      {/* </ImageContainer> */}
      <ParentContentContainer>
        <ChildContentContainer>
          <Heading>Wilbur</Heading>
          <SubHeading>Beautifully simple notes</SubHeading>
          {props.children}
        </ChildContentContainer>
      </ParentContentContainer>
    </Container>
  );
};

export { LoginScreen };
