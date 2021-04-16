import React from "react";
import styled from "styled-components";
import { EditorContainer } from "../components/EditorContainer";
import { PageLayout, Main, Content, LeftSidebar } from "@atlaskit/page-layout";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const NotesContainer = () => {
  return (
    <Wrapper>
      <PageLayout>
        <Content testId="content">
          {
            <LeftSidebar
              testId="leftSidebar"
              id="space-navigation"
              isFixed={false}
              width={125}
              height="100vh"
            ></LeftSidebar>
          }
          {
            <Main testId="main" id="main" skipLinkTitle="Main Content">
              <EditorContainer />
            </Main>
          }
        </Content>
      </PageLayout>
    </Wrapper>
  );
};

export { NotesContainer };
