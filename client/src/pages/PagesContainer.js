import React, { useState, useEffect, useCallback } from "react";
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
  const [pages, setPages] = useState([]);
  const [documentId, setDocumentId] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isNewDocumentTitle, setIsNewDocumentTitle] = useState(false);
  console.log("🚀 Current document ID", documentId);
  console.log({ documentTitle });

  useEffect(() => {
    if (documentId) {
      console.log(
        "🚀 PagesContainer.useEffect > Document ID changed to",
        documentId
      );
      setIsFetching(true);
      Database.doc(`pages/${documentId}`)
        .get()
        .then((doc) => {
          const data = doc.data();
          console.log("🚀 PagesContainer.useEffect > Data received", data);
          setDocumentTitle(data.documentTitle);
          setDocumentContent(data.documentContent);
          setIsFetching(false);
        });
    }
  }, [documentId]);

  useEffect(() => {
    const fn = async () => {
      if (!isDeleting || isNewDocumentTitle) {
        const pagesCollection = await Database.collection("pages").get();
        console.log("🚀 PagesContainer.useEffect", pagesCollection);
        const pagesCollectionData = pagesCollection.docs.map((doc) =>
          doc.data()
        );
        setPages(pagesCollectionData);
        setIsNewDocumentTitle(false);
      }
    };
    fn();
  }, [isDeleting, isNewDocumentTitle]);

  const handleDelete = useCallback((documentId) => {
    const fn = async () => {
      if (documentId) {
        setIsDeleting(true);
        await Database.doc(`pages/${documentId}`).delete();
        setIsDeleting(false);
      }
    };
    fn();
  }, []);

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
                      onDocumentCreate={setIsNewDocumentTitle}
                      onDocumentSelect={setDocumentId}
                      onDocumentDelete={handleDelete}
                      documentTitle={documentTitle}
                      documentId={documentId}
                      pages={pages}
                    />
                  </LeftSidebar>
                }
                {
                  <Main testId="main" id="main" skipLinkTitle="Main Content">
                    <EditorContainer
                      actions={actions}
                      isFetching={isFetching}
                      documentId={documentId}
                      documentTitle={documentTitle}
                      documentContent={documentContent}
                      onDocumentTitleChange={setDocumentTitle}
                      onDocumentContentChange={setDocumentContent}
                      onDocumentReplace={(adf) => {
                        console.log(`🚀 Changing document to`, adf);
                        actions.replaceDocument(adf);
                      }}
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
