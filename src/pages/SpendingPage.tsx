import { FaChartBar, FaMoneyBillWave, FaFileInvoice, FaPiggyBank } from 'react-icons/fa';
import { useThemeStore } from '../store/themeStore';
import BottomNav from '../components/BottomNav';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAppStore, type Transaction } from '../store/appStore';
import SpendMoneyModal from '../components/SpendMoneyModal';
import { toast } from 'react-toastify';
// MUI
import { Select, MenuItem, FormControl, InputLabel, Box, Card, CardContent, Typography } from '@mui/material';

  const spendingData = [
    { week: '2-8', value: 100 },
    { week: '9-15', value: 50 },
    { week: '16-22', value: 120 },
    { week: '23-29', value: 30 },
    { week: '30-1', value: 80 },
  ];

  const categories = [
    { name: 'Spending', icon: FaChartBar, color: 'text-blue-500', active: true },
    { name: 'Income', icon: FaMoneyBillWave, color: 'text-green-500', active: false },
    { name: 'Bills', icon: FaFileInvoice, color: 'text-yellow-500', active: false },
    { name: 'Savings', icon: FaPiggyBank, color: 'text-orange-500', active: false },
  ];



const SpendingPage: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { user, fetchTransactionsByMonth } = useAppStore();
  const [selectedMonth, setSelectedMonth] = useState<string>('January');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isSpendModalOpen, setIsSpendModalOpen] = useState(false);

 const spendTransactions = filteredTransactions.filter(tx => tx.type === 'Spending');

 useEffect(() => {
  // Загружаем транзакции за январь при монтировании
  fetchTransactionsByMonth(selectedMonth).then((data) => {
  	setFilteredTransactions(data);
  });
 }, []);



const handleMonthChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMonth(e.target.value as string);
	 
  }


  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <Header title="Spending" showBack={true} onBack={() => window.history.back()} />

		<div className="px-4 py-3 flex justify-center ${isDarkMode ? 'text-white' : 'text-gray-900'}">
      <button
        onClick={() => setIsSpendModalOpen(true)}
        className="py-2.5 px-4 rounded-xl font-medium transition border"
      >
        Spend Money
      </button>
    </div>

      {/* Month Selector */}
      <Box mx={2} my={2}>
        <FormControl fullWidth>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Month"
            onChange={handleMonthChange}
            sx={{
              backgroundColor: isDarkMode ? 'background.paper' : 'background.paper',
            }}
          >
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
          </Select>
        </FormControl>
      </Box>
		

      {/* Summary Cards */}
      <Box display="flex" gap={2} mx={2} my={2}>
        <Card
          sx={{
            flex: 1,
            backgroundColor: isDarkMode ? 'primary.dark' : 'primary.main',
            color: 'white',
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" gap={1}>
              <FaChartBar />
              <span>Total Spend</span>
            </Box>
            <h2 className="text-2xl font-bold">$500.00</h2>
          </CardContent>
        </Card>
        <Card
          sx={{
            flex: 1,
            backgroundColor: isDarkMode ? 'warning.dark' : 'warning.main',
            color: 'white',
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" gap={1}>
              <FaMoneyBillWave />
              <span>Available Balance</span>
            </Box>
            <h2 className="text-2xl font-bold">${user?.balance}</h2>
          </CardContent>
        </Card>
      </Box>
	  
	{/* Chart */}
      <Box mx={2} my={2}>
        <Card
          sx={{
            backgroundColor: isDarkMode ? 'background.paper' : 'background.paper',
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              {spendingData.map((item, idx) => (
                <Box key={idx} display="flex" flexDirection="column" alignItems="center" gap={1}>
                  <div
                    className={`w-8 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} rounded-t`}
                    style={{ height: `${item.value / 2}px` }}
                  ></div>
                  <span className="text-xs">{item.week}</span>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Category Tabs */}
      <Box mx={2} my={2} display="flex" gap={0} flexWrap="nowrap">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => console.log(`Switch to ${cat.name}`)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
              cat.active
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-800'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <cat.icon size={15} className={cat.color} />
            <span>{cat.name}</span>
          </button>
        ))}
      </Box>

      {/* Spending List */}
      <Box mx={2} my={2}>
        <Card
          sx={{
            backgroundColor: isDarkMode ? 'background.paper' : 'background.paper',
            boxShadow: 3,
          }}
        >
          <CardContent className="overflow-y-auto max-h-60">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} >
              <h3 className="font-semibold">Spending list</h3>
            </Box>
            {spendTransactions.map((tx, idx) => (
              <Box
                key={idx}
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
					 <Typography className={tx.type === 'Income' ? 'text-green-500' : 'text-red-500'}>{tx.type === 'Income' ? '+' : ''}${tx.amount}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

		<SpendMoneyModal
        isOpen={isSpendModalOpen}
        onClose={() => setIsSpendModalOpen(false)}
        onSuccess={(amount) => {
          toast.success(`Successfully spent $${amount}`);
        }}
      />

      {/* Нижнее меню */}
      <BottomNav />
    </div>
  );
};

export default SpendingPage;