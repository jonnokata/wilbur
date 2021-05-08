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
import { UpdateProfile } from "../Users/UpdateProfile";

const LeftNav = (props) => {
  const { currentUser, loading, logout } = useAuth();
  const history = useHistory();
  const documentId = uuidv4();
  const documentContent = {
    version: 1,
    type: "doc",
    content: [],
  };

  console.log("LeftNav", props);
  const handleLogout = () => {
    logout();
    history.push("/user/login");
  };

  return (
    <SideNavigation label="Side Navigation">
      {/* User details */}
      <NavigationHeader>
        <Header iconBefore={<PersonIcon />}>
          {/* {loading ? null : currentUser.email} */}
        </Header>
      </NavigationHeader>
      <NestableNavigationContent>
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
                              documentTitle: `Untitled ${Date.now()}`,
                              documentContent,
                            })
                              .then((res) => {
                                props.onDocumentSelect(documentId);
                                props.onDocumentCreate(true);
                              })
                              .catch(console.error);
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
        </Section>
        {/* Page tree */}
        <Section hasSeparator>
          <PageTree
            onDocumentSelect={props.onDocumentSelect}
            onDocumentDelete={props.onDocumentDelete}
            documentTitle={props.documentTitle}
            documentId={props.documentId}
            pages={props.pages}
          />
        </Section>
      </NestableNavigationContent>
      <NavigationFooter>
        <Footer>
          <Fragment>
            <Button appearance="link" spacing="compact" onClick={handleLogout}>
              Log Out
            </Button>
            {" ∙ "}
            <UpdateProfile />
          </Fragment>
        </Footer>
      </NavigationFooter>
    </SideNavigation>
  );
};

export { LeftNav };
