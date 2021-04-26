// import { BrowserRouter as Router } from "react-router-dom";
import { PagesContainer } from "./pages/PagesContainer";
import { LoginScreen } from "./pages/LoginScreen";
import { LoginForm } from "./components/Users/LoginForm";
import { SignUpForm } from "./components/Users/SignUpForm";
import { PasswordResetForm } from "./components/Users/PasswordResetForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./theme/globalStyle";
import { AuthProvider } from "./contexts/AuthContext";

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* <GlobalStyle /> */}

        <Switch>
          {/* <PrivateRoute
            exact
            path="/"
            component={PagesContainer}
          ></PrivateRoute> */}
          <Route exact path="/" component={PagesContainer} />
          <Route path="/user" component={LoginScreen}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
  // <UserProvider>
  //   const user = null; return user ? (
  //   <PagesContainer />) : (
  //   <Router>
  //     <SignUpForm path="signup" />
  //     {/*<LoginScreen path="/" /> */}
  //     {/* <PasswordResetForm path="passwordReset" />*/}
  //     {/* <LoginScreen /> */}
  //     {/*<PagesContainer /> */}
  //   </Router>
  //   );
  // </UserProvider>;
};
