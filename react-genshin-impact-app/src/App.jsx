import Nav from "./components/Nav";
import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import CharactersPage from "./pages/CharactersPage";
import BossesPage from "./pages/BossesPage";
import TeamBuilderPage from "./pages/TeamBuilderPage";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/bosses" element={<BossesPage />} />
        <Route path="/teambuilder" element={<TeamBuilderPage />} />
      </Routes>
    </>
  );
}

export default App;
