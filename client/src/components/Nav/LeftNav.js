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
  CustomItem,
  CustomItemComponentProps,
} from "@atlaskit/side-navigation";
import { NewPageButton } from "./NewPageButton";
import Button, { ButtonGroup } from "@atlaskit/button";
import { v4 as uuidv4 } from "uuid";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LeftNav = (props) => {
  const { currentUser, loading, logout } = useAuth();
  const history = useHistory();

  const handleNewPageCreate = () => {
    const documentId = uuidv4();
    const newPage = {
      documentId,
      // userId,
      documentTitle: "",
      documentContent: { version: 1, type: "doc", content: [] },
    };
    fetch(`http://localhost:3000/api/pages/new-page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPage),
      // send user id here
    })
      .then((res) => {
        console.log("res: ", res);
        return res.json();
      })
      .then((data) => {
        props.onDocumentCreate(data.documentContent);
      });
  };

  const handleLogout = () => {
    logout();
    history.push("/user/login");
  };

  const openProfileModal = () => {};

  // const PageHeader = () => (
  //   <CustomItem
  //     href="/create-article-6"
  //     component={CustomLink}
  //     iconBefore={<AddItemIcon label="" />}
  //   >
  //     Custom create article
  //   </CustomItem>
  // );
  return (
    <SideNavigation label="Side Navigation">
      {/* User details */}
      <NavigationHeader>
        <Header iconBefore={<PersonIcon />}>
          {loading ? null : currentUser.email}
        </Header>
        {/* <Header
            component={
              <CustomItem>{loading ? null : currentUser.email}</CustomItem>
            }
          ></Header> */}
      </NavigationHeader>
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
            <Button appearance="link" spacing="compact" onClick={handleLogout}>
              Log Out
            </Button>
            {" ∙ "}
            <Button
              appearance="link"
              spacing="compact"
              onClick={openProfileModal}
            >
              Update Details
            </Button>
          </Fragment>
        </Footer>
      </NavigationFooter>
    </SideNavigation>
  );
};

export { LeftNav };
