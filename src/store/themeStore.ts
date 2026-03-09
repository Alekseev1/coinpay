// src/store/themeStore.ts
import { create } from "zustand";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  // Проверяем localStorage или системные настройки
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme ? savedTheme === "dark" : prefersDark;

  return {
    isDarkMode: initialTheme,
    toggleTheme: () => {
      const newTheme = !get().isDarkMode;
      set({ isDarkMode: newTheme });
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    },
    setTheme: (isDark) => {
      set({ isDarkMode: isDark });
      localStorage.setItem("theme", isDark ? "dark" : "light");
    },
  };
});
