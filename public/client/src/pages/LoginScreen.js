import React, { useState } from "react";
import { LoginForm } from "../components/Users/LoginForm";
import { SignUpForm } from "../components/Users/SignUpForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

const LoginScreen = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={SignUpForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export { LoginScreen };
