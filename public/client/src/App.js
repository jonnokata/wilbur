// import { BrowserRouter as Router } from "react-router-dom";
import { PagesContainer } from "./pages/PagesContainer";
import { LoginScreen } from "./pages/LoginScreen";
import { Router } from "@reach/router";
import { LoginForm } from "./components/Users/LoginForm";
import { SignUpForm } from "./components/Users/SignUpForm";
import { PasswordResetForm } from "./components/Users/PasswordResetForm";
import UserProvider from "./Providers/UserProvider";

export const App = () => {
  <UserProvider>
    const user = null; return user ? (
    <PagesContainer />) : (
    <Router>
      <SignUpForm path="signup" />
      <LoginScreen path="/" />
      <PasswordResetForm path="passwordReset" />
      {/* <LoginScreen /> */}
      {/*<PagesContainer /> */}
    </Router>
    );
  </UserProvider>;
};
