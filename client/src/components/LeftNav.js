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

const LeftNav = () => {
  return (
    <SideNavigation label="Side Navigation">
      {/* User details */}
      <Section hasSeparator>
        <NavigationHeader>USER PROFILE HERE</NavigationHeader>
      </Section>

      {/* Page tree */}
      <Section>
        <PageTree></PageTree>
      </Section>

      {/* Add page*/}
    </SideNavigation>
  );
};

export { LeftNav };
