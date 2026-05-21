import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./AuthContext";

const ThemeContext = createContext();

const fallbackTheme = {
  name: "Default Teal",
  key: "default-teal",
  config: {
    primaryColor: "#0f766e",
    secondaryColor: "#00353E",
    accentColor: "#9ACD32",
    backgroundColor: "#ffffff",
    textColor: "#111827",
    fontFamily: "Inter, sans-serif",
  },
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  const config = theme?.config || fallbackTheme.config;
  root.style.setProperty("--theme-primary", config.primaryColor);
  root.style.setProperty("--theme-secondary", config.secondaryColor);
  root.style.setProperty("--theme-accent", config.accentColor);
  root.style.setProperty("--theme-bg", config.backgroundColor);
  root.style.setProperty("--theme-text", config.textColor);
  root.style.setProperty("--theme-font", config.fontFamily);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(fallbackTheme);
  const [loadingTheme, setLoadingTheme] = useState(true);

  const refreshTheme = useCallback(async () => {
    try {
      const response = await api.get("/themes/active");
      if (response.data?.theme) {
        setTheme(response.data.theme);
        applyTheme(response.data.theme);
      } else {
        applyTheme(fallbackTheme);
      }
    } catch (_error) {
      applyTheme(fallbackTheme);
    } finally {
      setLoadingTheme(false);
    }
  }, []);

  useEffect(() => {
    refreshTheme();
  }, [refreshTheme]);

  const value = useMemo(
    () => ({
      theme,
      loadingTheme,
      refreshTheme,
    }),
    [theme, loadingTheme, refreshTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
