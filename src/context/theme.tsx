import React, { createContext, useState } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: localStorage.getItem("theme") || "light",
  setTheme: () => {},
});

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const valueToShare = {
    theme: theme,
    setTheme: setTheme,
  };
  return (
    <ThemeContext.Provider value={valueToShare}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
