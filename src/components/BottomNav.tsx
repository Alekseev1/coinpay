import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Home, AccountBalance, QrCode, Chat, Person } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import clsx from 'clsx';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useThemeStore();

  const getActiveTab = () => {
    switch (location.pathname) {
      case '/':
        return '/';
      case '/spending':
        return '/spending';
      case '/profile':
        return '/profile';
      default:
        return '/';
    }
  };

  const value = getActiveTab();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isMobile) return null;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  // Пример: кастомный стиль для активной кнопки
  const getButtonClass = (tabValue: string) => {
    return clsx(
      'flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors',
      {
        'text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30': value === tabValue,
        'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200': value !== tabValue,
      }
    );
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isDarkMode ? 'background.paper' : 'background.paper',
        borderTop: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      }}
    >
      <BottomNavigationAction
        label="Home"
        value="/"
        icon={<Home />}
        className={getButtonClass('/')}
        sx={{
          color: value === '/' ? 'primary.main' : undefined,
        }}
      />
      <BottomNavigationAction
        label="Spending"
        value="/spending"
        icon={<AccountBalance />}
        className={getButtonClass('/spending')}
        sx={{
          color: value === '/spending' ? 'primary.main' : undefined,
        }}
      />
      <BottomNavigationAction
        label="Scan"
        value="/scan"
        icon={<QrCode />}
        className={getButtonClass('/scan')}
        sx={{
          color: value === '/scan' ? 'primary.main' : undefined,
        }}
		onClick={() => navigate('/scan')}
      />
      <BottomNavigationAction
        label="Chat"
        value="/chat"
        icon={<Chat />}
        className={getButtonClass('/chat')}
        sx={{
          color: value === '/chat' ? 'primary.main' : undefined,
        }}
      />
      <BottomNavigationAction
        label="Profile"
        value="/profile"
        icon={<Person />}
        className={getButtonClass('/profile')}
        sx={{
          color: value === '/profile' ? 'primary.main' : undefined,
        }}
      />
    </BottomNavigation>
  );
};

export default BottomNav;