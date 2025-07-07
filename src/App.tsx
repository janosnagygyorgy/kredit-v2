import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import CalculatorService from "./services/CalculatorService";
import StorageService from "./services/StorageService";
import Help from "./pages/Help";

function App() {
  const calculatorService = new CalculatorService();
  const storageService = new StorageService();

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/Home"
            element={
              <Home
                calculatorService={calculatorService}
                storageService={storageService}
              />
            }
          />
          <Route
            path="/settings"
            element={<Settings calculatorService={calculatorService} />}
          />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
