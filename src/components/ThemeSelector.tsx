interface ThemeSelectorProps {
  setTheme: (theme: string) => void;
}

function ThemeSelector({ setTheme }: ThemeSelectorProps) {
  return (
    <div className="flex items-center h-8 p-1.5 border-1 border-solid border-link-highlight rounded-lg">
      <div className="cursor-pointer" onClick={() => setTheme("light")}>
        ☀️
      </div>
      <div className="mx-1 cursor-pointer" onClick={() => setTheme("dark")}>
        🌙
      </div>
      <div className="cursor-pointer" onClick={() => setTheme("system")}>
        💻
      </div>
    </div>
  );
}

export default ThemeSelector;
