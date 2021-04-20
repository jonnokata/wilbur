import React, { useState } from "react";
import styled from "styled-components";

const PageTitle = () => {
  const [pageTitle, setPageTitle] = useState("");
  return (
    <input type="text" placeholder="Give this page a title" id="pageTitle" />
  );
};

export { PageTitle };
