import React from "react";
import styled from "styled-components";
import { PageTree } from "./PageTree";
import {
  SideNavigation,
  Section,
  NavigationHeader,
  NestableNavigationContent,
  Footer,
  NavigationFooter,
} from "@atlaskit/side-navigation";
import { NewPageButton } from "./NewPageButton";
import { v4 as uuidv4 } from "uuid";

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
        <NavigationHeader>USER PROFILE HERE</NavigationHeader>
      </Section>

      {/* Page tree */}
      <Section hasSeparator>
        <PageTree></PageTree>
      </Section>

      {/* Add page*/}
      <Section hasSeparator>
        <NewPageButton onClick={handleNewPageCreate} />
      </Section>
    </SideNavigation>
  );
};

export { LeftNav };
