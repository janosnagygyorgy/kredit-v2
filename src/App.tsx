import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import CalculatorService from "./services/CalculatorService";

function App() {
  const calculatorService = new CalculatorService();

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/Home"
            element={<Home calculatorService={calculatorService} />}
          />
          <Route
            path="/settings"
            element={<Settings calculatorService={calculatorService} />}
          />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
