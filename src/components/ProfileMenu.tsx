// src/components/ProfileMenu.tsx
import { FaChevronRight } from 'react-icons/fa';
import { useThemeStore } from '../store/themeStore';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface ProfileMenuProps {
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
}

const ProfileMenu = ({ items, onItemClick }: ProfileMenuProps) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`mx-4 rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick && onItemClick(item)}
          className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="text-xl">{item.icon}</div>
            <span>{item.label}</span>
          </div>
          <FaChevronRight size={16} className="text-gray-400" />
        </div>
      ))}
    </div>
  );
};

export default ProfileMenu;
