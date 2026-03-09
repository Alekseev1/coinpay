import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { useThemeStore } from '../store/themeStore';
import { Paper, Container, Typography } from '@mui/material';

const LoginPage = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();

  // Если уже залогинен — редирект
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: isDarkMode ? 'background.default' : 'background.default',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          backgroundColor: isDarkMode ? 'background.paper' : 'background.paper',
          color: isDarkMode ? 'text.primary' : 'text.primary',
        }}
      >
        <Header title="Log In" showBack={false} showThemeToggle={true} />

        <LoginForm />

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          No account?{' '}
          <button
            onClick={() => navigate('/register')}
            style={{
              color: 'primary.main',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'inherit',
            }}
          >
            Sign up
          </button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;