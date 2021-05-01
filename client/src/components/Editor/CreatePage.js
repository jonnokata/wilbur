import React, { useState, useEffect } from "react";

create firstUserPage = () => {
        const [currentPage, setCurrentPage] = useState({});
        const onDocumentCreate = (actions) => (newDoc) => {
          console.log("newDoc: ", newDoc);
          console.log("actions: ", actions);
          actions.replaceDocument(newDoc);
          setCurrentPage({ documentContent: newDoc, documentTitle: "" });
        };
        const [documentId, setDocumentId] = useState("");

}

const CreateLoadingPage = ({ user, runMutation, setDocumentId }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runMutation({
      documentId,
      uid: user.uid,
      documentTitle: "",
      documentContent: {
        version: 1,
        type: "doc",
        content: [],
      },
    }).then((res) => {
      setDocumentId(documentId);
      console.log("Ran mutation ", res);
    });
  }, []);
};

export default CreateLoadingPage;
