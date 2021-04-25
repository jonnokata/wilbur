import React, { Fragment } from "react";
import styled from "styled-components";
import { PageTree } from "./PageTree";
import {
  SideNavigation,
  Section,
  NavigationHeader,
  Header,
  NestableNavigationContent,
  Footer,
  NavigationFooter,
  IconBefore,
} from "@atlaskit/side-navigation";
import { NewPageButton } from "./NewPageButton";
import Button, { ButtonGroup } from "@atlaskit/button";
import { v4 as uuidv4 } from "uuid";
import { Logo } from "../Logo";

const LeftNav = (props) => {
  const handleNewPageCreate = () => {
    const documentId = uuidv4();
    const newPage = {
      documentId,
      documentTitle: "",
      documentContent: { version: 1, type: "doc", content: [] },
    };
    fetch(`http://localhost:3000/api/pages/new-page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPage),
    })
      .then((res) => {
        console.log("res: ", res);
        return res.json();
      })
      .then((data) => {
        props.onDocumentCreate(data);
      });
  };

  return (
    <SideNavigation label="Side Navigation">
      {/* User details */}
      <Section>
        <NavigationHeader>
          <Header component={Logo}></Header>
        </NavigationHeader>
      </Section>

      {/* Page tree */}
      <Section hasSeparator>
        <PageTree></PageTree>
      </Section>

      {/* Add page*/}
      <Section hasSeparator>
        <NewPageButton onClick={handleNewPageCreate} />
      </Section>
      <NavigationFooter>
        <Footer>
          <ButtonGroup>
            <Button appearance="link">Log Out</Button>
            {" ∙ "}
            <Button appearance="link">Update details</Button>
          </ButtonGroup>
        </Footer>
      </NavigationFooter>
    </SideNavigation>
  );
};

export { LeftNav };
