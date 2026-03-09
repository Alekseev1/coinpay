import { FaSearch, FaBell, FaArrowRight } from 'react-icons/fa';
import { useThemeStore } from '../store/themeStore';
import BottomNav from '../components/BottomNav';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useAppStore } from '../store/appStore';
import { useState, useEffect } from 'react';
import AddMoneyModal from '../components/AddMoneyModal';
import { toast } from 'react-toastify';

// MUI
import { Card, CardContent, CardActions, Button, Box, Typography } from '@mui/material';

const DashboardPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, transactions } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetchTransactions } = useAppStore.getState();

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const currency = 'US Dollar';

  const quickActions = [
    { label: 'Send', icon: '💸', color: 'text-blue-500' },
    { label: 'Request', icon: '💰', color: 'text-yellow-500' },
    { label: 'Bank', icon: '🏦', color: 'text-orange-500' },
  ];

  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9M9 19c0 1.105-1.105 2-2.5 2S4 20.105 4 19V9C4 7.895 5.105 7 6.5 7S9 7.895 9 9v10zm6.5-3a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <span className="text-lg font-semibold">CoinPay</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaSearch size={20} />
          <FaBell size={20} />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? (
              <FaSun size={18} className="text-yellow-300" />
            ) : (
              <FaMoon size={18} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <Box mx={2} my={2}>
        <Card
          sx={{
            backgroundColor: isDarkMode ? 'primary.dark' : 'primary.main',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="center" gap={0.5} mb={2}>
              <Typography variant="body2">🇺🇸 {currency}</Typography>
              <FaArrowRight size={16} />
            </Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              ${user?.balance.toLocaleString()}
            </Typography>
            <Typography variant="body2" opacity={0.8}>
              Available Balance
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: isDarkMode ? 'primary.light' : 'primary.light',
                color: 'primary.contrastText',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'primary.main' : 'primary.dark',
                },
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Add Money
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Quick Actions Card */}
      <Box mx={2} my={2}>
        <Card
          sx={{
            backgroundColor: isDarkMode ? 'background.paper' : 'background.paper',
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-around">
              {quickActions.map((action, idx) => (
                <Box key={idx} display="flex" flexDirection="column" alignItems="center" gap={1}>
                  <Typography variant="h4" className={action.color}>
                    {action.icon}
                  </Typography>
                  <Typography variant="caption">{action.label}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Transactions Card */}
      <Box mx={2} my={2}>
        <Card
          sx={{
            backgroundColor: isDarkMode ? 'background.paper' : 'background.paper',
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Recent
              </Typography>
              <FaArrowRight size={16} />
            </Box>

            <Box className="max-h-60 overflow-y-auto">
              {transactions.length === 0 ? (
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  No transactions yet
                </Typography>
              ) : (
                transactions.slice(0, 10).map((tx) => (
                  <Box
                    key={tx.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    py={1}
                    borderBottom={`1px solid ${isDarkMode ? '#444' : '#eee'}`}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography className={tx.type === 'Income' ? 'text-green-500' : 'text-red-500'}>
                        {tx.type === 'Income' ? '💵' : '💳'}
                      </Typography>
                      <Typography>{tx.description}</Typography>
                    </Box>
                    <Typography className={tx.type === 'Income' ? 'text-green-500' : 'text-red-500'}>
                      {tx.type === 'Income' ? '+' : ''}${Math.abs(tx.amount)}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>

      <BottomNav />
      <AddMoneyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(amount) => {
          toast.success(`🎉 Successfully added $${amount}!`);
        }}
      />
    </div>
  );
};

export default DashboardPage;