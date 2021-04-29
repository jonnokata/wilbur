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

const LoginForm = () => {
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = (data) => {
    console.log("data: ", data);
    login(data.email, data.password);
    history.push("/");
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
      {/* {JSON.stringify(currentUser)} */}
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            {/* <FormHeader title="Log In" /> */}
            <Field name="email" label="Email" isRequired defaultValue="">
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField autoComplete="off" {...fieldProps} />
                  {error && (
                    <ErrorMessage>
                      {/* This email is already in use, try another one. */}
                    </ErrorMessage>
                  )}
                </Fragment>
              )}
            </Field>
            <Field name="password" label="Password" defaultValue="" isRequired>
              {({ fieldProps, error, valid, meta }) => {
                return (
                  <Fragment>
                    <TextField type="password" {...fieldProps} />
                  </Fragment>
                );
              }}
            </Field>
            <FormFooter>
              <ButtonGroup>
                <Button appearance="subtle-link">
                  <Link to="/user/signup">Need an account? Sign up here.</Link>
                </Button>
                <Button appearance="subtle">Cancel</Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  Log In
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
};

export { LoginForm };

// import React, { useState, Fragment, useRef } from "react";
// import styled from "styled-components";
// import { fromPairs } from "lodash";
// import { Link, useHistory } from "react-router-dom";
// import Form, {
//   ErrorMessage,
//   Field,
//   FormSection,
//   FormHeader,
//   FormFooter,
//   ValidMessage,
//   HelperMessage,
// } from "@atlaskit/form";
// import TextField from "@atlaskit/textfield";
// import Button from "@atlaskit/button";
// import ButtonGroup from "@atlaskit/button/button-group";
// import LoadingButton from "@atlaskit/button/loading-button";

// const LoginForm = () => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const { login, currentUser } = useAuth();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();

//   async function handleSubmit(e) {
//     console.log("e", e);
//     e.preventDefault();

//     try {
//       setError("");
//       setLoading(true);
//       await login(emailRef.current.value, passwordRef.current.value);
//       history.push("/");
//     } catch {
//       setError("Failed to sign in");
//     }
//     setLoading(false);
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         width: "400px",
//         maxWidth: "100%",
//         margin: "0 auto",
//         flexDirection: "column",
//       }}
//     >
//       <h2> Log In</h2>
//       {JSON.stringify(currentUser)}
//       <Form onSubmit={handleSubmit}>
//         {({ formProps, submitting }) => (
//           <form {...formProps}>
//             <Field
//               ref={emailRef}
//               name="email"
//               label="Email"
//               isRequired
//               defaultValue=""
//             >
//               {({ fieldProps, error }) => (
//                 <Fragment>
//                   <TextField autoComplete="off" {...fieldProps} />
//                   {error && (
//                     <ErrorMessage>
//                       This email is already in use, try another one.
//                     </ErrorMessage>
//                   )}
//                 </Fragment>
//               )}
//             </Field>
//             <Field
//               ref={passwordRef}
//               name="password"
//               label="Password"
//               defaultValue=""
//               isRequired
//               validate={(value) =>
//                 value && value.length < 8
//                   ? "Your password length needs to be at least 8 characters."
//                   : undefined
//               }
//             >
//               {({ fieldProps, error, valid, meta }) => {
//                 return (
//                   <Fragment>
//                     <TextField type="password" {...fieldProps} />
//                     {error && !valid && (
//                       <HelperMessage>
//                         Use 8 or more characters with a mix of letters, numbers
//                         & symbols.
//                       </HelperMessage>
//                     )}
//                     {error && (
//                       <ErrorMessage>
//                         Password needs to be more than 8 characters.
//                       </ErrorMessage>
//                     )}
//                     {valid && meta.dirty ? (
//                       <ValidMessage>Awesome password!</ValidMessage>
//                     ) : null}
//                   </Fragment>
//                 );
//               }}
//             </Field>
//             <FormFooter>
//               <ButtonGroup>
//                 <Button appearance="subtle-link">
//                   <Link to="/signup">Don't have an account? Sign up here.</Link>
//                 </Button>
//                 <Button appearance="subtle">Cancel</Button>
//                 <LoadingButton
//                   type="submit"
//                   appearance="primary"
//                   isLoading={loading}
//                 >
//                   Log In
//                 </LoadingButton>
//               </ButtonGroup>
//             </FormFooter>
//           </form>
//         )}
//       </Form>
//     </div>
//   );
// };

// export { LoginForm };
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState(null);
// //   const signInWithEmailAndPasswordHandler = (event, email, password) => {
// //     event.preventDefault();
// //     auth.signInWithEmailAndPassword(email, password).catch((error) => {
// //       setError("Error signing in with password and email!");
// //       console.error("Error signing in with password and email", error);
// //     });
// //   };

// //   const onChangeHandler = (event) => {
// //     const { name, value } = event.currentTarget;

// //     if (name === "email") {
// //       setEmail(value);
// //     } else if (name === "password") {
// //       setPassword(value);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Sign In</h1>
// //       <div className="">
// //         {error !== null && <div className="">{error}</div>}

// //         <form className="">
// //           <label htmlFor="email" className="block">
// //             Email:
// //           </label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={email}
// //             placeholder="E.g: jonno@wilbur.com"
// //             onChange={(event) => onChangeHandler(event)}
// //           />
// //           <label htmlFor="password">Password:</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={password}
// //             placeholder="Your password"
// //             onChange={(event) => onChangeHandler(event)}
// //           />
// //           <button
// //             type="Submit"
// //             className=""
// //             onClick={(event) => {
// //               signInWithEmailAndPasswordHandler(event, email, password);
// //             }}
// //           >
// //             Sign In
// //           </button>
// //         </form>
// //         <p className="">or</p>
// //         <button className="b">Sign in with Google</button>
// //         <p className="\">
// //           Don't have an account?{" "}
// //           <Link to="" className="">
// //             Sign up here
// //           </Link>{" "}
// //           <br />{" "}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export { LoginForm };

// // -------------

// // const history = useHistory();
// // const [loginForm, setLoginForm] = useState({
// //   email: "",
// //   password: "",
// // });
// // const [error, setError] = useState(null);

// // const changeHandler = (e) => {
// //   const newLoginFormState = { ...loginForm };
// //   newLoginFormState[e.target.name] = e.target.value;
// //   console.log(newLoginFormState);
// //   setLoginForm(newLoginFormState);
// // };

// // const formSubmitHandler = (e) => {
// //   e.preventDefault();
// //   fetch("/api/auth/login", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(loginForm),
// //   })
// //     .then((response) => response.json())
// //     .then((data) => {
// //       window.localStorage.setItem("token", data.token);
// //       if (data.token) {
// //         history.replace("/");
// //       }
// //     });
// // };

// // return (
// //   <div>
// //     <h1>Sign In</h1>
// //     <div className="">
// //       {error !== null && <div className="">{error}</div>}

// //       <form>
// //         <label htmlFor="email">Email:</label>
// //         <inpu
// //           type="email"
// //           name="email"
// //           value={loginForm.email}
// //           placeholder="E.g: jonno@wilbur.com"
// //           onChange={changeHandler}
// //         />
// //         <label htmlFor="password">Password:</label>
// //         <input
// //           type="password"
// //           name="password"
// //           value={loginForm.password}
// //           placeholder="Your password"
// //           onChange={changeHandler}
// //         />
// //         <button type="Submit">Sign In</button>
// //       </form>
// //       <p className="">or</p>
// //       <button className="b">Sign in with Google</button>
// //       <p className="\">
// //         Don't have an account?{" "}
// //         <Link to="" className="">
// //           Sign up here
// //         </Link>{" "}
// //         <br />{" "}
// //       </p>
// //     </div>
// //   </div>
// // );
// // };
