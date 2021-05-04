// import { BrowserRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import { PagesContainer } from "./pages/PagesContainer";
import { LoginScreen } from "./pages/LoginScreen";
import { PasswordResetForm } from "./components/Users/PasswordResetForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { FirestoreProvider } from "@react-firebase/firestore";
import { LoginForm } from "./components/Users/LoginForm";
import { SignUpForm } from "./components/Users/SignUpForm";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import injectGlobal from "./fonts/fonts";

const config = {
  apiKey: "AIzaSyCyqaVB7PobJR1EcsN6YXlFIxqv_tUNiRI",
  projectId: "wilbur-8fec7",
  databaseURL: "https://wilbur-8fec7.firebaseio.com",
  authDomain: "wilbur-8fec7.firebaseapp.com",
  // OPTIONAL
  storageBucket: "wilbur-8fec7.appspot.com",
  messagingSenderId: "691701871121",
};

export const App = () => {
  const [documentId, setDocumentId] = useState("");

  return (
    <Router>
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <FirestoreProvider {...config} firebase={firebase}>
          <injectGlobal />
          <AuthProvider>
            <Switch>
              {/* <PrivateRoute
                exact
                path="/"
                component={PagesContainer}
              ></PrivateRoute> */}
              {/* <Route exact path="/user" component={LoginScreen} />{" "} */}
              <Route exact path="/user/signup">
                <LoginScreen>
                  <SignUpForm />
                </LoginScreen>
              </Route>
              <Route exact path="/user/login">
                <LoginScreen>
                  <LoginForm />
                </LoginScreen>
              </Route>
              <Route exact path="/" component={PagesContainer} />
            </Switch>
          </AuthProvider>
        </FirestoreProvider>
      </FirebaseAuthProvider>
    </Router>
  );
};
