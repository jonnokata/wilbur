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

const LeftNav = () => {
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
        <NewPageButton />
      </Section>
    </SideNavigation>
  );
};

export { LeftNav };
