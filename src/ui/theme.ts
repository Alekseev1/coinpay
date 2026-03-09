import { createTheme } from "@mui/material/styles";

export type Theme = ReturnType<typeof createTheme>;

export const getTheme = (isDarkMode: boolean): Theme =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#90caf9" : "#1976d2", // светло-синий в темной теме
      },
      background: {
        default: isDarkMode ? "#121212" : "#f5f5f5",
        paper: isDarkMode ? "#1e1e1e" : "#ffffff", // темный фон карточек
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000",
        secondary: isDarkMode ? "#bbbbbb" : "#666666",
      },
    },
  });
