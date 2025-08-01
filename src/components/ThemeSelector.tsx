interface ThemeSelectorProps {
  setTheme: (theme: string) => void;
}

function ThemeSelector({ setTheme }: ThemeSelectorProps) {
  return (
    <div>
      <input
        type="button"
        value="☀️Világos"
        onClick={() => setTheme("light")}
      />
      <input type="button" value="🌙Sötét" onClick={() => setTheme("dark")} />
      <input type="button" value="💻Alap" onClick={() => setTheme("system")} />
    </div>
  );
}

export default ThemeSelector;
