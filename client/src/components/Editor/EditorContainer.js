import React, { useEffect, useState, useCallback } from "react";
import { Editor } from "@atlaskit/editor-core";
import _, { fromPairs } from "lodash";
import styled from "styled-components";
import { FirestoreMutation } from "@react-firebase/firestore";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
// import { Title } from "@atlaskit/modal-dialog/dist/types/internal/styles/content";
import { Database } from "../../firebase";

const EditorStyleContainer = styled.div`
  height: 100%;
  padding: 16px 32px;
`;

const TitleContainer = styled.input`
  border: none;
  width: 100%;
  outline: none;
  height: 32px;
  font-size: 32px;
  padding: 0px 0px 32px 0px;
`;

// UPDATE PAGE CONTENT
const EditorContainer = (props) => {
  const {
    documentId,
    documentTitle,
    documentContent,
    onDocumentReplace,
    onDocumentTitleChange,
    isFetching,
  } = props;
  console.log(
    "🚀 EditorContainer.render > Editor received",
    documentTitle,
    documentContent
  );

  const handleTitleChange = useCallback(
    (title) => {
      onDocumentTitleChange(title);
    },
    [onDocumentTitleChange]
  );

  useEffect(() => {
    console.log(
      "🚀 EditorContainer.useEffect > running effect",
      isFetching,
      documentContent
    );
    if (!isFetching && documentContent) {
      onDocumentReplace(documentContent);
    }
  }, [documentId, isFetching]);

  const actions = props.actions;
  let docPath = `pages/${props.documentId}`;

  return (
    <EditorStyleContainer>
      <WilburEditor
        documentId={documentId}
        documentTitle={documentTitle}
        onDocumentTitleChange={handleTitleChange}
        actions={actions}
      />
    </EditorStyleContainer>
  );
};

const WilburEditor = ({
  documentId,
  documentTitle,
  onDocumentTitleChange,
  actions,
}) => {
  let docPath = `pages/${documentId}`;

  const runMutationDebounced = useCallback(
    _.debounce((properties) => {
      // console.log("runMutationDebounced");
      Database.doc(docPath)
        .update(properties)
        .then((res) => {
          console.log("Ran mutation ", res);
        });
    }, 1000),
    [docPath]
  );
  return (
    <Editor
      contentComponents={
        <TitleContainer
          type="text"
          placeholder="Give this page a title"
          id="pageTitle"
          autoComplete="off"
          value={documentTitle}
          onChange={(e) => {
            const title = e.target.value;
            runMutationDebounced({ documentTitle: title });
            onDocumentTitleChange(title);
          }}
        />
      }
      defaultValue={""}
      onChange={() => {
        actions.getValue().then((adf) => {
          runMutationDebounced({
            documentContent: adf,
          });
        });
      }}
      appearance="full-width"
      allowFindReplace={true}
      allowExpand={{
        allowInsertion: true,
        allowInteractiveExpand: true,
      }}
      placeholder="G'day! Type away :)"
      placeholderHints={["Type / to insert content"]}
      allowDate={true}
      allowKeyboardAccessibleDatepicker={true}
      allowStatus={true}
      allowLayouts={true}
      allowPanel={true}
      allowBlockType={true}
      allowBreakout={true}
      allowTextColor={true}
      allowTables={{
        advanced: true,
        allowBackgroundColor: true,
        allowHeaderColumn: true,
        allowHeaderRow: true,
        allowMergeCells: true,
        allowNumberColumn: true,
        allowColumnSorting: true,
        stickToolbarToBottom: true,
        tableCellOptimization: true,
        stickyHeaders: true,
        stickyHeadersOptimization: true,
        initialRenderOptimization: true,
        mouseMoveOptimization: true,
      }}
    />
  );
};

export { EditorContainer };
