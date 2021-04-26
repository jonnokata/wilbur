import React, { Fragment } from "react";
import PersonIcon from "@atlaskit/icon/glyph/person";
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
import { cssFn } from "@atlaskit/menu";

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

  const handleLogout = () => {};

  return (
    <SideNavigation label="Side Navigation">
      {/* User details */}
      <Section>
        <NavigationHeader>
          <Header iconBefore={<PersonIcon />} description="Hello"></Header>
        </NavigationHeader>
      </Section>
      <NestableNavigationContent>
        {/* Page tree */}
        <Section hasSeparator>
          <PageTree></PageTree>
        </Section>

        {/* Add page*/}
        <Section hasSeparator>
          <NewPageButton onClick={handleNewPageCreate} />
        </Section>
      </NestableNavigationContent>
      <NavigationFooter>
        <Footer>
          <Fragment>
            <Button appearance="link" spacing="compact">
              Log Out
            </Button>
            {" ∙ "}
            <Button appearance="link" spacing="compact">
              Update Details
            </Button>
          </Fragment>
        </Footer>
      </NavigationFooter>
    </SideNavigation>
  );
};

export { LeftNav };
