import React, { useEffect, useState } from "react";
import {
  Editor,
  WithEditorActions,
  EditorContext,
} from "@atlaskit/editor-core";
import _, { fromPairs } from "lodash";
import { PageTitle } from "./PageTitle";
import styled from "styled-components";

const EditorStyleContainer = styled.div`
  height: 100%;
  padding: 0 32px;
`;

// UPDATE PAGE CONTENT
const EditorContainer = (props) => {
  const [editorState, setEditorState] = useState({});

  const handleTitleChange = (e) => {
    const newEditorState = { ...editorState };
    newEditorState.documentTitle = e.target.value;
    setEditorState(newEditorState);
  };

  useEffect(() => {
    console.log("props.pageEdit", props.pageEdit);
    setEditorState(props.pageEdit);
  }, [props.pageEdit]);

  const handleContentChange = (actions) =>
    _.debounce(() => {
      actions.getValue().then((adf) => {
        console.log(adf);
        const data = {
          documentTitle: editorState.documentTitle,
          documentContent: adf,
        };
        fetch(`api/pages/update-page/${editorState._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => {
          console.log("res: ", res);
        });
      });
    }, 1000);

  return (
    <EditorStyleContainer>
      <EditorContext>
        <WithEditorActions
          render={(actions) => (
            <Editor
              contentComponents={
                <input
                  type="text"
                  placeholder="Give this page a title"
                  id="pageTitle"
                  value={editorState.documentTitle}
                  onChange={handleTitleChange}
                />
              }
              defaultValue={""}
              // value={editorState.documentContent}
              onChange={handleContentChange(actions)}
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
          )}
        ></WithEditorActions>
      </EditorContext>
    </EditorStyleContainer>
  );
};

export { EditorContainer };

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
