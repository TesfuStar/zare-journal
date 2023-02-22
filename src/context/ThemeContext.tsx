import { useState, useContext, createContext, useCallback } from "react";

const ThemeContext = createContext<any | null>(null);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: any) => {
  const [currentMode, setCurrentMode] = useState<string>("Light");

  const setMode = useCallback((mode: string) => {
    setCurrentMode(mode);
    localStorage.setItem("themeMode", mode);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentMode,
        setMode,
        setCurrentMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
