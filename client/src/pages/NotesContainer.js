import React from "react";
import styled from "styled-components";
import { EditorContainer } from "../components/EditorContainer";
import {
  PageLayout,
  Main,
  Content,
  LeftSidebar,
  LeftSidebarWithoutResize,
  LeftPanel,
} from "@atlaskit/page-layout";

const NotesContainer = () => {
  return (
    <PageLayout>
      <Content testId="content">
        {
          <LeftSidebar
            testId="leftSidebar"
            id="space-navigation"
            skipLinkTitle="Space Navigation"
            isFixed={false}
            width={125}
          ></LeftSidebar>
        }
        {
          <Main testId="main" id="main" skipLinkTitle="Main Content">
            <div>
              <EditorContainer />
            </div>
          </Main>
        }
      </Content>
    </PageLayout>
  );
};

export { NotesContainer };
