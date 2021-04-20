import { BrowserRouter as Router } from "react-router-dom";
import { PagesContainer } from "./pages/PagesContainer";
import { LoginScreen } from "./pages/LoginScreen";

export const App = () => {
  return (
    <Router>
      {/*<LoginScreen /> */}
      <PagesContainer />
    </Router>
  );
};
