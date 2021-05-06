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
    onDocumentChange,
  } = props;

  const [title, setTitle] = useState(documentTitle);
  const [document, setDocument] = useState(documentContent);

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  useEffect(() => {
    if (documentContent && documentContent.length > 0) {
      onDocumentChange(documentContent);
    }
  }, [documentId]);

  const actions = props.actions;
  let docPath = `pages/${props.documentId}`;

  const runMutationDebounced = useCallback(
    _.debounce((runMutation, properties) => {
      // console.log("runMutationDebounced");
      runMutation(properties).then((res) => {
        console.log("Ran mutation ", res);
      });
    }, 1000),
    []
  );

  return (
    <EditorStyleContainer>
      <FirestoreMutation type="update" path={docPath}>
        {({ runMutation }) => {
          return (
            <Editor
              contentComponents={
                <TitleContainer
                  type="text"
                  placeholder="Give this page a title"
                  id="pageTitle"
                  autoComplete="off"
                  // value={editorState.documentTitle || ""}
                  value={title}
                  onChange={handleTitleChange}
                />
              }
              defaultValue={""}
              value={document}
              onChange={() => {
                setDocument(document);
                actions.getValue().then((adf) => {
                  runMutationDebounced(runMutation, {
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
        }}
      </FirestoreMutation>
    </EditorStyleContainer>
  );
};

export { EditorContainer };
