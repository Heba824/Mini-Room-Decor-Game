import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RoomCanvasPage from "./pages/RoomCanvasPage";
// later you'll also have RoomCanvasPage

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/room-canvas" element={<RoomCanvasPage />} />
    </Routes>
  );
}
