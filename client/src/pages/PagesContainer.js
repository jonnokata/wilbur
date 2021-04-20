import React, { useState } from "react";
import styled from "styled-components";
import { EditorContainer } from "../components/Editor/EditorContainer";
import { PageLayout, Main, Content, LeftSidebar } from "@atlaskit/page-layout";
import { LeftNav } from "../components/Nav/LeftNav";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PagesContainer = () => {
  const [currentPage, setCurrentPage] = useState({});
  const onDocumentCreate = (newDoc) => {
    console.log("newDoc: ", newDoc);
    setCurrentPage(newDoc);
  };
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
            >
              <LeftNav onDocumentCreate={onDocumentCreate}></LeftNav>
            </LeftSidebar>
          }
          {/* <div
            id="sidebarSeparator"
            cursor="default"
            height="100%"
            width="24px"
            padding="0px"
            border="0px"
            background-color="transparent"
          ></div> */}
          {
            <Main testId="main" id="main" skipLinkTitle="Main Content">
              <EditorContainer pageEdit={currentPage} />
            </Main>
          }
        </Content>
      </PageLayout>
    </Wrapper>
  );
};

export { PagesContainer };
