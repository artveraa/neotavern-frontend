import { createContext } from "react";

export const ThemeContext = createContext({
  textColor: {
    color: "red",
  },
});

export const ThemeProvider = ({ children, value }) => {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
