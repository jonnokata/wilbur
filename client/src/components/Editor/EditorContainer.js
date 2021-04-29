import React, { useEffect, useState } from "react";
import { Editor } from "@atlaskit/editor-core";
import _, { fromPairs } from "lodash";
// import { PageTitle } from "./PageTitle";
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
  const [editorState, setEditorState] = useState({
    documentTitle: "",
  });

  const handleTitleChange = (e) => {
    const newEditorState = { ...editorState };
    newEditorState.documentTitle = e.target.value;
    setEditorState(newEditorState);
  };
  console.log("props.actions ", props.actions);

  useEffect(() => {
    console.log("props.pageEdit", props.pageEdit);
    setEditorState({
      documentContent: props.pageEdit.documentContent,
      documentTitle: props.pageEdit.documentTitle,
    });
  }, [props.pageEdit]);

  // const handleContentChange = (actions) =>
  //   _.debounce(() => {
  //     actions.getValue().then((adf) => {
  //       console.log(adf);
  //       const data = {
  //         documentTitle: editorState.documentTitle,
  //         documentContent: adf,
  //       };
  //       console.log("Data: ", data);
  //       // fetch(`/api/pages/update-page/${editorState._id}`, {
  //       //   method: "PATCH",
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //   },
  //       //   body: JSON.stringify(data),
  //       // }).then((res) => {
  //       //   console.log("res: ", res);
  //       // });
  //     });
  //   }, 1000);
  // let docPath = "pages/" + props.documentId;
  // console.log("props.docId: ", props.documentId);
  const actions = props.actions;
  let docPath = `pages/${props.documentId}`;
  console.log("docPath: ", docPath);

  return (
    <EditorStyleContainer>
      <FirestoreMutation type="update" path={docPath}>
        {({ runMutation }) => {
          // // const actions = props.actions;
          console.log("props.actions: ", props.actions);
          return (
            <Editor
              contentComponents={
                <TitleContainer
                  type="text"
                  placeholder="Give this page a title"
                  id="pageTitle"
                  autoComplete="off"
                  value={editorState.documentTitle}
                  onChange={handleTitleChange}
                />
              }
              defaultValue={""}
              // value={editorState.documentContent}
              onChange={
                // handleContentChange(props.actions)
                () => {
                  _.debounce(() => {
                    actions.getValue().then((adf) => {
                      console.log("ADF: ", adf);
                      runMutation({
                        // documentId: props.documentId,
                        documentTitle: editorState.documentTitle,
                        documentContent: adf,
                      }).then((res) => {
                        console.log("Ran mutation ", res);
                      });
                    });
                  }, 1000);
                }
              }
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

// <FirestoreMutation type="set" path="/pages/12345">
//   {({ runMutation }) => {
//     return (
//       <div>
//         <button
//           onClick={() => {
//             runMutation({
//               nowOnCli: Date.now(),
//               nowOnServer: firebase.firestore.FieldValue.serverTimestamp(),
//             }).then((res) => {
//               console.log("Ran mutation ", res);
//             });
//           }}
//         >
//           Mutate Set
//         </button>
//       </div>
//     );
//   }}
// </FirestoreMutation>;

// const EditorContainer = (props) => {
//   const [editorState, setEditorState] = useState({
//     documentContent: "",
//   });

//   const handleChange = (actions) =>
//     _.debounce(() => {
//       actions.getValue().then((adf) => {
//         // fetch('../', { adf })
//         console.log(JSON.stringify(adf));
//       });
//     }, 1000);

//   return (
//     <EditorContext>
//       <WithEditorActions
//         render={(actions) => (
//           <Editor
//             contentComponents={<PageTitle></PageTitle>}
//             value={editorState.documentContent}
//             onChange={handleChange(actions)}
//             appearance="full-width"
//             allowFindReplace={true}
//             allowExpand={{
//               allowInsertion: true,
//               allowInteractiveExpand: true,
//             }}
//             placeholder="G'day! Type away :)"
//             placeholderHints={["Type / to insert content"]}
//             allowDate={true}
//             allowKeyboardAccessibleDatepicker={true}
//             allowStatus={true}
//             allowLayouts={true}
//             allowPanel={true}
//             allowBlockType={true}
//             allowBreakout={true}
//             allowTextColor={true}
//             allowTables={{
//               advanced: true,
//               allowBackgroundColor: true,
//               allowHeaderColumn: true,
//               allowHeaderRow: true,
//               allowMergeCells: true,
//               allowNumberColumn: true,
//               allowColumnSorting: true,
//               stickToolbarToBottom: true,
//               tableCellOptimization: true,
//               stickyHeaders: true,
//               stickyHeadersOptimization: true,
//               initialRenderOptimization: true,
//               mouseMoveOptimization: true,
//             }}
//           />
//         )}
//       ></WithEditorActions>
//     </EditorContext>
//   );
// };

// export { EditorContainer };

// --------------------------------

// const EditorContainer = (props) => {
//   const [newPage, setNewPage] = useState(false);
//   const [editorState, setEditorState] = useState({});
//   const [editorDefaultValue, setEditorDefaultValue] = useState({});

//   const handleTitleChange = (e) => {
//     const newEditorState = { ...editorState };
//     newEditorState.documentTitle = e.target.value;
//     setEditorState(newEditorState);
//     setNewPage(false);
//   };

//   useEffect(() => {
//     console.log("props.pageEdit", props.pageEdit);
//     setEditorState(props.pageEdit);
//     setEditorDefaultValue("");
//     setNewPage(true);
//   }, [props.pageEdit]);

//   const handleContentChange = (actions) =>
//     _.debounce(() => {
//       setNewPage(false);
//       actions.getValue().then((adf) => {
//         console.log(adf);
//         const data = {
//           documentTitle: editorState.documentTitle,
//           documentContent: adf,
//         };
//         fetch(`api/pages/update-page/${editorState._id}`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }).then((res) => {
//           console.log("res: ", res);
//         });
//       });
//     }, 1000);

//   return (
//     <EditorContext>
//       <WithEditorActions
//         render={(actions) => {
//           if (newPage === true) {
//             console.log("replace: ");
//             actions.replaceDocument({});
//           }
//           console.log({ actions });
//           return (
//             <Editor
//               contentComponents={
//                 <input
//                   type="text"
//                   placeholder="Give this page a title"
//                   id="pageTitle"
//                   value={editorState.documentTitle}
//                   onChange={handleTitleChange}
//                 />
//               }
//               defaultValue={""}
//               // value={editorState.documentContent}
//               onChange={handleContentChange(actions)}
//               appearance="full-width"
//               allowFindReplace={true}
//               allowExpand={{
//                 allowInsertion: true,
//                 allowInteractiveExpand: true,
//               }}
//               placeholder="G'day! Type away :)"
//               placeholderHints={["Type / to insert content"]}
//               allowDate={true}
//               allowKeyboardAccessibleDatepicker={true}
//               allowStatus={true}
//               allowLayouts={true}
//               allowPanel={true}
//               allowBlockType={true}
//               allowBreakout={true}
//               allowTextColor={true}
//               allowTables={{
//                 advanced: true,
//                 allowBackgroundColor: true,
//                 allowHeaderColumn: true,
//                 allowHeaderRow: true,
//                 allowMergeCells: true,
//                 allowNumberColumn: true,
//                 allowColumnSorting: true,
//                 stickToolbarToBottom: true,
//                 tableCellOptimization: true,
//                 stickyHeaders: true,
//                 stickyHeadersOptimization: true,
//                 initialRenderOptimization: true,
//                 mouseMoveOptimization: true,
//               }}
//             />
//           );
//         }}
//       ></WithEditorActions>
//     </EditorContext>
//   );
// };
// onChange={handleContentChange(props.actions)}

// onChange={() => {
//   runMutation({}).then((res) => {
//     console.log("Ran mutation ", res);
//   });
// }}

// ---------------

// onChange={(action) =>
//   _.debounce(() => {
//     actions.getValue().then((adf) => {
//       console.log(adf);
//       runMutation({
//         documentTitle: editorState.documentTitle,
//         documentContent: adf,
//       }).then((res) => {
//         console.log("Ran mutation ", res);
//       });
//     });
//   }, 1000)
// }
