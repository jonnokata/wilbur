import React from "react";
import styled from "styled-components";
import { ButtonItem } from "@atlaskit/side-navigation";
import { EditorAddIcon } from "@atlaskit/icon";
import AddIcon from "@atlaskit/icon/glyph/editor/add";

const NewPageButton = () => {
  return <ButtonItem iconAfter={<AddIcon />}>Create Page</ButtonItem>;
};

export { NewPageButton };
