import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../utils/DarkModeContext';

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label={isDarkMode ? 'Bright Mode aktivieren' : 'Dark Mode aktivieren'}
    >
      {isDarkMode ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
}
