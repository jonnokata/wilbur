import React, { useState } from "react";
import { Link } from "@reach/router";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    try{
        const {user} = await auth.createUserWithEmailAndPassword(email, password);
        generateUserDocument(user, {displayName});
      }
      catch(error){
        setError('Error Signing up with email and password');
      }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="">
      <h1 className="">Sign Up</h1>
      <div className="">
        {error !== null && <div className="">{error}</div>}
        <form className="">
          <label htmlFor="displayName" className="">
            Display Name:
          </label>
          <input
            type="text"
            className=""
            name="displayName"
            value={displayName}
            placeholder="E.g: Wilbur"
            id="displayName"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            type="email"
            className=""
            name="email"
            value={email}
            placeholder="E.g: hello@wilbur.com"
            id="email"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="">
            Password:
          </label>
          <input
            type="password"
            className=""
            name="password"
            value={password}
            placeholder="Your Password"
            id="password"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            className=""
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p className="">or</p>
        <button className="">Sign In with Google</button>
        <p className="">
          Already have an account?{" "}
          <Link to="/" className="">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export { SignUpForm };
