import React from "react";
import { Editor } from "@atlaskit/editor-core";
import PageHeader from "@atlaskit/page-header";
import styled from "styled-components";

const EditorContainer = (props) => {
  // const [editorState, setEditorState] = useState();

  return (
    <div>
      <PageHeader>THIS WILL BE A TITLE INPUT</PageHeader>
      <Editor
        appearance="full-page"
        allowFindReplace={true}
        allowExpand={true}
        allowExpand={{
          allowInsertion: true,
          allowInteractiveExpand: true,
        }}
        placeholder="G'day! Type away :)"
        placeholderHints="Type / to insert content"
        allowDate={true}
        allowKeyboardAccessibleDatepicker={true}
        allowStatus={true}
        allowLayouts={true}
        allowPanel={true}
        allowBlockType={true}
        allowBreakout={true}
        allowTextColor={true}
        allowTables={true}
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
    </div>
  );
};

export { EditorContainer };
