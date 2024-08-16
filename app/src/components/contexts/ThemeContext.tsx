import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "dark" | "system" | "light";
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within a ThemeProvider");

  return value;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(
    (typeof window !== "undefined" &&
      (localStorage.getItem("theme") as Theme)) ||
      "system",
  );

  useEffect(() => {
    if (theme === "system") {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.classList.add(dark ? "dark" : "light");
    }

    if (theme === "dark") document.body.classList.add("dark");
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ["system", "light", "dark"];
    const current = themes.indexOf(theme);
    const next = themes[(current + 1) % themes.length];

    document.body.classList.remove("dark");

    setTheme(next);

    localStorage.setItem("theme", next);

    if (next === "dark") document.body.classList.add("dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
