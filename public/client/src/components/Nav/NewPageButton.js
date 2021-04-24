import React from "react";
import styled from "styled-components";
import { ButtonItem } from "@atlaskit/side-navigation";
import { EditorAddIcon } from "@atlaskit/icon";
import AddIcon from "@atlaskit/icon/glyph/editor/add";

// In below, onClick need to generate a documentID.

const NewPageButton = (props) => {
  const handleClick = (e) => {
    props.onClick();
  };

  return (
    <ButtonItem onClick={handleClick} iconAfter={<AddIcon />}>
      Create Page{" "}
    </ButtonItem>
  );
};

export { NewPageButton };
