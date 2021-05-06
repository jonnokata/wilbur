import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EditorContainer } from "../components/Editor/EditorContainer";
import { PageLayout, Main, Content, LeftSidebar } from "@atlaskit/page-layout";
import { LeftNav } from "../components/Nav/LeftNav";
import { WithEditorActions, EditorContext } from "@atlaskit/editor-core";
import { Database } from "../firebase";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PagesContainer = (currentDocumentId) => {
  const [documentId, setDocumentId] = useState("");
  const [editorContent, setEditorContent] = useState({
    documentTitle: "",
    documentContent: "",
  });
  // const docPath = "/pages ";

  useEffect(() => {
    const fn = async () => {
      if (documentId) {
        console.log("🚀 Document ID changed to", documentId);
        const doc = await Database.doc(`pages/${documentId}`).get();
        const data = doc.data();
        console.log("🚀 Data received", data);
        setEditorContent({
          documentTitle: data.documentTitle,
          documentContent: data.documentContent,
        });
      }
    };
    fn();
  }, [documentId]);

  console.log("changed to", documentId);

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
                      onDocumentCreate={() => {}}
                      onDocumentSelect={setDocumentId}
                    />
                  </LeftSidebar>
                }
                {
                  <Main testId="main" id="main" skipLinkTitle="Main Content">
                    <EditorContainer
                      actions={actions}
                      documentId={documentId}
                      documentTitle={editorContent.documentTitle}
                      documentContent={editorContent.documentContent}
                      onDocumentChange={actions.replaceDocument}
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

export { PagesContainer };
