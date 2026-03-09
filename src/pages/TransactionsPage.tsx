// src/pages/TransactionsPage.tsx
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useThemeStore } from '../store/themeStore';
import { useAppStore } from '../store/appStore';

import { useEffect } from 'react';

const TransactionsPage = () => {
  const { isDarkMode } = useThemeStore();
  const { transactions, fetchTransactions } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [ fetchTransactions ]);

  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Шапка фиксирована */}
      <Header
        title="Transactions"
        showBack={true}
        onBack={() => navigate(-1)}
      />

      {/* Контейнер для списка с локальным скроллом */}
      <div className={`mx-4 rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>

        {/* Список с ограничением по высоте и скроллом */}
        <div className="max-h-screen overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No transactions yet
            </div>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-xl ${tx.type === 'Income' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'Income' ? '💵' : '💳'}
                  </div>
                  <div>
                    <div>{tx.description}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(tx.createdAt).toLocaleDateString()} •{' '}
                      {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <span className={tx.type === 'Income' ? 'text-green-500' : 'text-red-500'}>
                  {tx.type === 'Income' ? '+' : ''}${Math.abs(tx.amount)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;