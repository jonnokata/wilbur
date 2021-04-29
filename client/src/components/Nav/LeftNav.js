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
import { FirestoreMutation } from "@react-firebase/firestore";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

const LeftNav = (props) => {
  const { currentUser, loading, logout } = useAuth();
  const history = useHistory();
  const documentId = uuidv4();

  const handleNewPageCreate = () => {
    const documentId = uuidv4();
    const newPage = {
      documentId,
      // userId,
      documentTitle: "",
      documentContent: { version: 1, type: "doc", content: [] },
    };
    fetch(`/api/pages/new-page`, {
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
          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              let docPath = "pages/" + documentId;
              return (
                <FirestoreMutation type="set" path={docPath}>
                  {({ runMutation }) => {
                    return (
                      <div>
                        <NewPageButton
                          onClick={() => {
                            runMutation({
                              documentId,
                              uid: user.uid,
                              documentTitle: "",
                              documentContent: {
                                version: 1,
                                type: "doc",
                                content: [],
                              },
                            }).then((res) => {
                              console.log("Ran mutation ", res);
                            });
                          }}
                        >
                          Mutate Set
                        </NewPageButton>
                      </div>
                    );
                  }}
                </FirestoreMutation>
              );
            }}
          </FirebaseAuthConsumer>
          {/* <NewPageButton onClick={hanleNewPageCreate} /> */}
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
