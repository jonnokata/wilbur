import { BrowserRouter as Router } from "react-router-dom";
import { NotesContainer } from "./pages/NotesContainer";

export const App = () => {
  return (
    <Router>
      <div>
        <NotesContainer />
      </div>
    </Router>
  );
};
