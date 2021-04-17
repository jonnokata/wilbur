import { BrowserRouter as Router } from "react-router-dom";
import { PagesContainer } from "./pages/PagesContainer";

export const App = () => {
  return (
    <Router>
      <PagesContainer />
    </Router>
  );
};
