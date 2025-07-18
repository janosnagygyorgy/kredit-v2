import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import StorageService from "./services/StorageService";
import CalculatorService from "./services/CalculatorService";
import type { CalculatorServiceConfig } from "./interfaces/CalculatorServiceConfig";
import { useEffect, useState } from "react";
import type { StoredData } from "./interfaces/StoredData";

function App() {
  const storageService = new StorageService();
  const [config, setConfig] = useState(storageService.getConfig());
  const [data, setData] = useState(storageService.getData());
  const [selectedSemester, setSelectedSemester] = useState(
    storageService.getSelectedSemester() ?? data[0].name
  );
  const calculatorService = new CalculatorService(
    data,
    selectedSemester,
    config
  );

  function handleImport(data: StoredData): void {
    // TODO validate data
    setData(() => data);
    setSelectedSemester(data[0].name);
  }

  function toggleSetting(setting: string): void {
    setConfig(
      (c) => ({ ...c, [setting]: !c[setting] } as CalculatorServiceConfig)
    );
  }

  useEffect(() => {
    storageService.saveData(data, selectedSemester);
  }, [data, selectedSemester]);

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
                data={data}
                setData={setData}
                selectedSemester={selectedSemester}
                setSelectedSemester={setSelectedSemester}
                calculatorService={calculatorService}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                data={data}
                onImport={handleImport}
                config={config}
                toggleSetting={toggleSetting}
              />
            }
          />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
