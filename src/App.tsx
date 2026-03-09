// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useThemeStore } from './store/themeStore';
import { getTheme } from './ui/theme';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SpendingPage from './pages/SpendingPage';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TransactionsPage from './pages/TransactionsPage';
import { useAppStore } from './store/appStore';
import { ToastContainer } from 'react-toastify';
import QrCodePage from './pages/QrCodePage';
import PersonalInfoPage from './pages/PersonalInfoPage';


// Компонент защищённого маршрута
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppStore((state) => state.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const user = useAppStore((state) => state.user);
   const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
	 <ThemeProvider theme={getTheme(isDarkMode)}>
		<Router>
			<div className="relative h-screen w-full overflow-hidden">
				<Routes>
					{/* Публичная страница входа */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					{/* Защищённые маршруты */}
					<Route
						path="/"
						element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
						}
					/>
					<Route
						path="/profile"
						element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
						}
					/>
					 <Route path="/scan" element={<QrCodePage />} />
					<Route
						path="/spending"
						element={
						<ProtectedRoute>
							<SpendingPage />
						</ProtectedRoute>
						}
					/>

						<Route
							path="/transactions"
							element={
								<ProtectedRoute>
									<TransactionsPage />
								</ProtectedRoute>
							}
							/>
					<Route
						path="/person"
						element={
							<ProtectedRoute>
								<PersonalInfoPage />
							</ProtectedRoute>
						}
					/>
						{/* Редирект по умолчанию */}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>

				{/* Показываем BottomNav только если пользователь залогинен */}
				{user && <BottomNav />}
			</div>
		</Router>
		<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
				theme="colored"
			/>
	 </ThemeProvider>
  );
}

export default App;