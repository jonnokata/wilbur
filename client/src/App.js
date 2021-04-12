import { BrowserRouter as Router } from "react-router-dom";
import { NotesContainer } from "./pages/NotesContainer";

export const App = () => {
  return (
    <Router>
      <div h="100vh" w="100vw">
        <NotesContainer />
      </div>
    </Router>
  );
};
