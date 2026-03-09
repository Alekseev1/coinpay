// src/pages/ProfilePage.tsx
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProfileMenu from '../components/ProfileMenu';
import { useThemeStore } from '../store/themeStore';
import { useAppStore } from '../store/appStore';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Интерфейс User используется в других частях приложения, оставляем его

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const ProfilePage = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, logout, updateUser } = useAppStore(); // ← добавили updateUser
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      id: 'dark-mode',
      label: isDarkMode ? 'Light Mode' : 'Dark Mode',
      icon: isDarkMode ? '☀️' : '🌙',
      path: '' // пустой путь для обработки клика отдельно
    },
    { id: 'personal-info', label: 'Personal Info', icon: '👤', path: '/person' },
    { id: 'transactions', label: 'Transactions', icon: '🔁', path: '/transactions' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id === 'dark-mode') {
      toggleTheme();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  });

  // Подгружаем данные пользователя при открытии модалки или если нужно — но у нас уже есть user из стора
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar: user.avatar,
      });
    }
  }, [user]);

  const handleEditClick = () => {
    if (user) {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedUser = await response.json(); // ← обновленный пользователь
      updateUser(updatedUser); // ← обновляем состояние
      toast.success('Profile updated!'); // ← добавляем уведомление
      setIsEditing(false); // ← закрываем модалку
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        toast.error(err.message || 'Failed to update profile');
      } else {
        toast.error('Failed to update profile');
      }
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="My Profile" showBack={true} onBack={() => window.history.back()} />

      {/* Profile Card */}
      <div className={`mx-4 my-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              {user.phone && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleEditClick}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} hover:opacity-80 transition-opacity`}
            aria-label="Edit profile"
          >
            🖊️
          </button>
        </div>
      </div>

      {/* Balance */}
      <div className={`mx-4 my-2 p-4 rounded-xl ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} text-white`}>
        <div>Available Balance</div>
        <div className="text-2xl font-bold">
          ${user.balance.toLocaleString()} {user.currency}
        </div>
      </div>

      {/* Menu List */}
      <ProfileMenu items={menuItems} onItemClick={handleMenuItemClick} />

      {/* Кнопка выхода */}
      <div className={`mx-4 rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mt-2`}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="text-xl">🔴</div>
            <span>Log Out</span>
          </div>
          <FaSignOutAlt size={16} />
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Avatar URL</label>
                <input
                  name="avatar"
                  value={editForm.avatar}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Phone (optional)</label>
                <input
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`flex-1 py-2 rounded font-medium border ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;