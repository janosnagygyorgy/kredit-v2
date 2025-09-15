import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
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
    storageService.getSelectedSemester() ?? data[0].id
  );
  const calculatorService = new CalculatorService(
    data,
    selectedSemester,
    config
  );

  function handleImport(data: StoredData): void {
    // TODO validate data
    setData(() => data);
    setSelectedSemester(data[0].id);
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
      <div className="px-5 md:px-10 py-2 bg-shadow">
        <h1 className="md:hidden">Kreditindex kalkulátor</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 items-center">
          <div className="flex my-2 justify-start">
            <Navbar />
          </div>
          <h1 className="hidden md:block text-center">
            Kreditindex kalkulátor
          </h1>
          <div className="flex justify-end">
            <ThemeSelector setTheme={setTheme} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-5 md:px-10 py-4 bg-background">
        <div className="w-full max-w-6xl">
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
      <Analytics />
    </div>
  );
}

export default App;
