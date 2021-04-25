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
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    signup(emailRef.current.value, passwordRef.current.value);
  }
  // // const { signup, currentUser } = useAuth();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  // const history = useHistory();

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   try {
  //     setError("");
  //     setLoading(true);
  //     await signup(emailRef.current.value, passwordRef.current.value);
  //     history.push("/");
  //   } catch {
  //     setError("Failed to create an account");
  //   }
  //   setLoading(false);
  // }

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
      <Form
        onSubmit={(data) => {
          console.log("form data", data);
          return new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
            data.username === "error" ? { username: "IN_USE" } : undefined
          );
        }}
      >
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <Field
              ref={emailRef}
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
              ref={passwordRef}
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

// const SignUpForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [error, setError] = useState(null);
//   const createUserWithEmailAndPasswordHandler = (event, email, password) => {
//     event.preventDefault();
//     try{
//         const {user} = await auth.createUserWithEmailAndPassword(email, password);
//         generateUserDocument(user, {displayName});
//       }
//       catch(error){
//         setError('Error Signing up with email and password');
//       }
//     setEmail("");
//     setPassword("");
//     setDisplayName("");
//   };
//   const onChangeHandler = (event) => {
//     const { name, value } = event.currentTarget;
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     } else if (name === "displayName") {
//       setDisplayName(value);
//     }
//   };
//   return (
//     <div className="">
//       <h1 className="">Sign Up</h1>
//       <div className="">
//         {error !== null && <div className="">{error}</div>}
//         <form className="">
//           <label htmlFor="displayName" className="">
//             Display Name:
//           </label>
//           <input
//             type="text"
//             className=""
//             name="displayName"
//             value={displayName}
//             placeholder="E.g: Wilbur"
//             id="displayName"
//             onChange={(event) => onChangeHandler(event)}
//           />
//           <label htmlFor="email" className="">
//             Email:
//           </label>
//           <input
//             type="email"
//             className=""
//             name="email"
//             value={email}
//             placeholder="E.g: hello@wilbur.com"
//             id="email"
//             onChange={(event) => onChangeHandler(event)}
//           />
//           <label htmlFor="userPassword" className="">
//             Password:
//           </label>
//           <input
//             type="password"
//             className=""
//             name="password"
//             value={password}
//             placeholder="Your Password"
//             id="password"
//             onChange={(event) => onChangeHandler(event)}
//           />
//           <button
//             className=""
//             onClick={(event) => {
//               createUserWithEmailAndPasswordHandler(event, email, password);
//             }}
//           >
//             Sign up
//           </button>
//         </form>
//         <p className="">or</p>
//         <button className="">Sign In with Google</button>
//         <p className="">
//           Already have an account?{" "}
//           <Link to="/" className="">
//             Sign in here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export { SignUpForm };
