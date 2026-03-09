import { useAppStore } from '../store/appStore';
import { useThemeStore } from '../store/themeStore';
import Header from '../components/Header';

const PersonalInfoPage = () => {
  const { user } = useAppStore();
  const { isDarkMode } = useThemeStore();

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header
        title="Personal Info"
        showBack={true}
        onBack={() => window.history.back()}
      />

      {/* Personal Info Card */}
      <div className={`mx-4 my-6 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-bold">{user.name}</h2>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          {user.phone && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;