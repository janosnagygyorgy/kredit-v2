interface ThemeSelectorProps {
  isDarkMode: boolean;
  setTheme: (theme: string) => void;
}

function ThemeSelector({ isDarkMode, setTheme }: ThemeSelectorProps) {
  return (
    <div
      className="flex items-center justify-center h-8 w-8 border-1 border-link-highlight rounded-lg cursor-pointer select-none"
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      {isDarkMode ? "☀️" : "🌙"}
    </div>
  );
}

export default ThemeSelector;
