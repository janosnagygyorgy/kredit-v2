import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import StorageService from "./services/StorageService";
import CalculatorService from "./services/CalculatorService";
import type { CalculatorServiceConfig } from "./interfaces/CalculatorServiceConfig";
import { useEffect, useState } from "react";

function App() {
  const storageService = new StorageService();
  const [config, setConfig] = useState(storageService.getConfig());
  const calculatorService = new CalculatorService(config);

  function toggleSetting(setting: string): void {
    setConfig(
      (c) => ({ ...c, [setting]: !c[setting] } as CalculatorServiceConfig)
    );
  }

  useEffect(() => {
    storageService.saveConfig(config);
  }, [config]);

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
            element={<Settings config={config} toggleSetting={toggleSetting} />}
          />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
