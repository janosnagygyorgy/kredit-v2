interface ThemeSelectorProps {
  setTheme: (theme: string) => void;
}

function ThemeSelector({ setTheme }: ThemeSelectorProps) {
  return (
    <div>
      <input type="button" value="Light" onClick={() => setTheme("light")} />
      <input type="button" value="Dark" onClick={() => setTheme("dark")} />
      <input type="button" value="System" onClick={() => setTheme("system")} />
    </div>
  );
}

export default ThemeSelector;
