import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import { FaArrowLeft, FaSun, FaMoon } from 'react-icons/fa';
import { useThemeStore } from '../store/themeStore';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showThemeToggle?: boolean;
}

const Header = ({ title, showBack = false, onBack, showThemeToggle = true }: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.background.paper,
        color: isDarkMode ? theme.palette.text.primary : theme.palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      }}
    >
      <Toolbar>
        {/* Кнопка "Назад" */}
        {showBack && (
          <IconButton edge="start" color="inherit" onClick={onBack} aria-label="back">
            <FaArrowLeft />
          </IconButton>
        )}

        {/* Пустое пространство, если кнопка "назад" не нужна */}
        {!showBack && <Box sx={{ width: 48 }} />}

        {/* Заголовок */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {title}
        </Typography>

        {/* Переключатель темы */}
        {showThemeToggle && (
          <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
        )}

        {/* Пустое пространство для выравнивания, если нет темы */}
        {!showThemeToggle && <Box sx={{ width: 48 }} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;