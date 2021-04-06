import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { EditorContainer } from "../components/EditorContainer";

const NotesContainer = () => {
  return (
    <div>
      <EditorContainer />
    </div>
  );
};

export { NotesContainer };
