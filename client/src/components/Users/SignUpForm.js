import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Form, {
  ErrorMessage,
  Field,
  FormHeader,
  FormFooter,
  ValidMessage,
  HelperMessage,
} from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import { useAuth } from "../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { FirestoreMutation } from "@react-firebase/firestore";

const SignUpForm = (props) => {
  const { signup } = useAuth();
  const history = useHistory();
  const documentId = uuidv4();

  const CreateFirstPage = ({ runMutation, user }) => {
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
        props.setDocumentId(documentId);
        console.log("Ran mutation ", res);
      });
  }

  const handleSubmit = (data, runMutation, user) => {
    console.log("data: ", data);
    signup(data.email, data.password).then(() => {
      CreateFirstPage(runMutation, user);
    });
    history.push("/user/login");
  };

  return (
    <div
      style={{
        display: "flex",
        width: "400px",
        maxWidth: "100%",
        margin: "0 auto",
        flexDirection: "column",
      }}
    >
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          let docPath = "pages/" + documentId;
          return (
            <FirestoreMutation type="set" path={docPath}>
              {({ runMutation }) => {
                return (
                  <Form onSubmit={handleSubmit(runMutation, user)}>
                    {({ formProps, submitting }) => (
                      <form {...formProps}>
                        {/* <FormHeader title="Sign Up" /> */}
                        <Field
                          name="email"
                          label="Email"
                          isRequired
                          defaultValue=""
                        >
                          {({ fieldProps, error }) => (
                            <Fragment>
                              <TextField autoComplete="off" {...fieldProps} />
                              {error && (
                                <ErrorMessage>
                                  This email is already in use, try another one.
                                </ErrorMessage>
                              )}
                            </Fragment>
                          )}
                        </Field>
                        <Field
                          name="password"
                          label="Password"
                          defaultValue=""
                          isRequired
                          validate={(value) =>
                            value && value.length < 8
                              ? "Your password length needs to be at least 8 characters."
                              : undefined
                          }
                        >
                          {({ fieldProps, error, valid, meta }) => {
                            return (
                              <Fragment>
                                <TextField type="password" {...fieldProps} />
                                {error && !valid && (
                                  <HelperMessage>
                                    Use 8 or more characters with a mix of
                                    letters, numbers & symbols.
                                  </HelperMessage>
                                )}
                                {error && (
                                  <ErrorMessage>
                                    Password needs to be more than 8 characters.
                                  </ErrorMessage>
                                )}
                                {valid && meta.dirty ? (
                                  <ValidMessage>Awesome password!</ValidMessage>
                                ) : null}
                              </Fragment>
                            );
                          }}
                        </Field>
                        <FormFooter>
                          <ButtonGroup>
                            <Button appearance="subtle-link">
                              <Link to="/user/login">
                                Have an account? Sign in here.
                              </Link>
                            </Button>
                            <Button appearance="subtle">Cancel</Button>
                            <LoadingButton
                              type="submit"
                              appearance="primary"
                              isLoading={submitting}
                            >
                              Sign Up
                            </LoadingButton>
                          </ButtonGroup>
                        </FormFooter>
                      </form>
                    )}
                  </Form>
                );
              }}
            </FirestoreMutation>
          );
        }}
      </FirebaseAuthConsumer>
    </div>
  );
};

export { SignUpForm };
