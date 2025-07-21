import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import type { StoredData } from "./interfaces/StoredData";
import type { StoredConfig } from "./interfaces/StoredConfig";
import StorageService from "./services/StorageService";
import CalculatorService from "./services/CalculatorService";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Help from "./pages/help/Help";
import Navbar from "./components/Navbar";
import ThemeSelector from "components/ThemeSelector";

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
    setConfig((c) => ({ ...c, [setting]: !c[setting] } as StoredConfig));
  }

  function setTheme(theme: string): void {
    switch (theme) {
      case "light":
      case "dark":
        localStorage.theme = theme;
        break;
      default:
        localStorage.removeItem("theme");
        break;
    }
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }

  useEffect(() => {
    document.body.classList.remove("no-transition");
  }, []);

  useEffect(() => {
    storageService.saveData(data, selectedSemester);
  }, [data, selectedSemester]);

  useEffect(() => {
    storageService.saveConfig(config);
  }, [config]);

  return (
    <div>
      <ThemeSelector setTheme={setTheme} />
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
                calculatorService={calculatorService}
                toggleSetting={toggleSetting}
              />
            }
          />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
