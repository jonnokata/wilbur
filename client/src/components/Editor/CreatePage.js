import React, { useState, useEffect } from "react";

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
