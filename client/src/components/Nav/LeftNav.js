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

const LeftNav = () => {
  const handleNewPageCreate = (page) => {
    const documentId = uuidv4();
    const newPage = { documentId, documentTitle: "", documentContent: {} };
    fetch(`api/pages/new-page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPage),
    }).then((res) => {
      console.log("res: ", res);
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
