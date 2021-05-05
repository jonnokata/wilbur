import React, { useState } from "react";
import styled from "styled-components";
import { EditorContainer } from "../components/Editor/EditorContainer";
import { PageLayout, Main, Content, LeftSidebar } from "@atlaskit/page-layout";
import { LeftNav } from "../components/Nav/LeftNav";
import { WithEditorActions, EditorContext } from "@atlaskit/editor-core";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PagesContainerTreeWorkingPage = () => {
  // history to show last selected page?

  const [currentPage, setCurrentPage] = useState({});
  const onDocumentCreate = (actions) => (newDoc) => {
    // onNew
    console.log("newDoc: ", newDoc);
    console.log("actions: ", actions);
    actions.replaceDocument(newDoc);
    setCurrentPage({ documentContent: newDoc, documentTitle: "" });
  };
  const [documentId, setDocumentId] = useState("");

  const rootId;

  const selectedPageId;

  const handlePageSelect;

  const handlePageMove;

  const handlePageDelete;

  return (
    <Wrapper>
      <EditorContext>
        <WithEditorActions
          render={(actions) => (
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
                    <LeftNav
                      onDocumentCreate={onDocumentCreate(actions)}
                      setDocumentId={setDocumentId}
                    ></LeftNav>
                  </LeftSidebar>
                }
                {
                  <Main testId="main" id="main" skipLinkTitle="Main Content">
                    <EditorContainer
                      actions={actions}
                      pageEdit={currentPage}
                      documentId={documentId}
                    />
                  </Main>
                }
              </Content>
            </PageLayout>
          )}
        />
      </EditorContext>
    </Wrapper>
  );
};

export { PagesContainerTreeWorkingPage };
