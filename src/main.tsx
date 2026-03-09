// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { useThemeStore } from './store/themeStore.ts';
import { useAppStore } from './store/appStore.ts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Применяем тему
useThemeStore.subscribe((state) => {
  document.body.className = state.isDarkMode ? 'dark' : '';
});

useAppStore.getState().fetchCurrentUser();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);