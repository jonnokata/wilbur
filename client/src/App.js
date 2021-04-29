// import { BrowserRouter as Router } from "react-router-dom";
import { PagesContainer } from "./pages/PagesContainer";
import { LoginScreen } from "./pages/LoginScreen";
import { PasswordResetForm } from "./components/Users/PasswordResetForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./theme/globalStyle";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { FirestoreProvider } from "@react-firebase/firestore";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";

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
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirestoreProvider {...config} firebase={firebase}>
        <Router>
          <AuthProvider>
            {/* <GlobalStyle /> */}

            <Switch>
              {/* <PrivateRoute
            exact
            path="/"
            component={PagesContainer}
          ></PrivateRoute> */}
              <Route path="/user" component={LoginScreen}></Route>
              <Route path="/" component={PagesContainer} />
            </Switch>
          </AuthProvider>
        </Router>
      </FirestoreProvider>
    </FirebaseAuthProvider>
  );
};
