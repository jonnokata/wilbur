import React, { useState } from "react";
import styled from "styled-components";

const TitleContainer = styled.input`
  border: none;
`;

const PageTitle = () => {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <TitleContainer
      type="text"
      placeholder="Give this page a title"
      id="pageTitle"
    />
  );
};

export { PageTitle };
