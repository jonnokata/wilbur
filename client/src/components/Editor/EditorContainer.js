import React, { useEffect, useState, useCallback } from "react";
import { Editor } from "@atlaskit/editor-core";
import _, { fromPairs } from "lodash";
import styled from "styled-components";
import { FirestoreMutation } from "@react-firebase/firestore";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

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
  console.log("Changed SPENCE:", props.pageEdit);
  let [editorState, setEditorState] = useState({
    documentContent: props.pageEdit?.documentContent || "",
    documentTitle: props.pageEdit?.documentTitle || "",
  });

  console.log("Changed SPENCE2:", editorState.documentTitle);
  const handleTitleChange = (e) => {
    console.log(e.target.value, {
      ...editorState,
      documentTitle: e.target.value,
    });
    setEditorState({ ...editorState, documentTitle: e.target.value });
  };

  const actions = props.actions;
  let docPath = `pages/${props.documentId}`;
  // console.log("docPath: ", docPath);
  // const [loading, setLoading] = useState(true);

  const runMutationDebounced = useCallback(
    _.debounce((runMutation, properties) => {
      // console.log("runMutationDebounced");
      runMutation(properties).then((res) => {
        console.log("Ran mutation ", res);
      });
    }, 1000),
    []
  );

  useEffect(() => {
    setEditorState({
      documentContent: props.pageEdit?.documentContent || "",
      documentTitle: props.pageEdit?.documentTitle || "",
    });
  }, [props.documentId]);

  console.log("Docpath: ", docPath);
  return (
    <EditorStyleContainer>
      <FirestoreMutation type="update" path={docPath}>
        {({ runMutation }) => {
          // console.log("props.actions: ", props.actions);
          console.log(editorState.documentTitle || "");
          return (
            <Editor
              contentComponents={
                <TitleContainer
                  type="text"
                  placeholder="Give this page a title"
                  id="pageTitle"
                  autoComplete="off"
                  defaultValue={editorState.documentTitle || ""}
                  onChange={(e) => {
                    handleTitleChange(e);
                    console.log("e.target.value: ", e.target.value);
                    runMutation({
                      documentTitle: e.target.value,
                    });
                  }}
                />
              }
              defaultValue={""}
              onChange={() => {
                console.log("handleContentChange");
                actions.getValue().then((adf) => {
                  // console.log("ADF: ", adf);
                  // console.log("Document Title: ", editorState.documentTitle);
                  runMutationDebounced(runMutation, {
                    // documentTitle: editorState.documentTitle || "",
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
