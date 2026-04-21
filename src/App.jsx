import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import PlacePage from "./pages/PlacePage";
import SavedPage from "./pages/SavedPage";
import MapPage from "./pages/MapPage";
import RestroomsPage from "./pages/RestroomsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/restrooms" element={<RestroomsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
