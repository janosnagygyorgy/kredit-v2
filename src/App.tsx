import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
