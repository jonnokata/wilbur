import React, { Fragment, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Form, {
  ErrorMessage,
  Field,
  FormSection,
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

const SignUpForm = () => {
  const { signup } = useAuth();

  const handleSubmit = (data) => {
    console.log("data: ", data);
    signup(data.email, data.password);
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
      <h2> Sign Up</h2>
      {/* {JSON.stringify(currentUser)} */}
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            {/* <FormHeader title="Sign Up" /> */}
            <Field name="email" label="Email" isRequired defaultValue="">
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
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols.
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
                  <Link to="/login">
                    Already have an account? Sign in here.
                  </Link>
                </Button>
                <Button appearance="subtle">Cancel</Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  Sign up
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
};

export { SignUpForm };
