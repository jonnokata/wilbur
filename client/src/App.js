// import { BrowserRouter as Router } from "react-router-dom";
import { PagesContainer } from "./pages/PagesContainer";
import { LoginScreen } from "./pages/LoginScreen";
import { LoginForm } from "./components/Users/LoginForm";
import { SignUpForm } from "./components/Users/SignUpForm";
import { PasswordResetForm } from "./components/Users/PasswordResetForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./theme/globalStyle";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* <GlobalStyle /> */}

        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={PagesContainer}
          ></PrivateRoute>
          <Route path="/user" component={LoginScreen}></Route>
          {/* <Route path="/" component={PagesContainer} /> */}
        </Switch>
      </AuthProvider>
    </Router>
  );
};
