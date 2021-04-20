import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "@reach/router";
import { fromPairs } from "lodash";

const LoginForm = () => {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    const newLoginFormState = { ...loginForm };
    newLoginFormState[e.target.name] = e.target.value;
    console.log(newLoginFormState);
    setLoginForm(newLoginFormState);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    })
      .then((response) => response.json())
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        if (data.token) {
          history.replace("/");
        }
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <div className="">
        {error !== null && <div className="">{error}</div>}

        <form>
          <label htmlFor="email">Email:</label>
          <inpu
            type="email"
            name="email"
            value={loginForm.email}
            placeholder="E.g: jonno@wilbur.com"
            onChange={changeHandler}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={loginForm.password}
            placeholder="Your password"
            onChange={changeHandler}
          />
          <button type="Submit">Sign In</button>
        </form>
        <p className="">or</p>
        <button className="b">Sign in with Google</button>
        <p className="\">
          Don't have an account?{" "}
          <Link to="" className="">
            Sign up here
          </Link>{" "}
          <br />{" "}
        </p>
      </div>
    </div>
  );
};

export { LoginForm };
