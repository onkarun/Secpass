import React from 'react';
import { Shield, Search, Moon, Sun, Settings, LogOut } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSearch: (query: string) => void;
  onSettings: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  onSearch, 
  onSettings,
  onLogout,
  isAuthenticated
}) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SecureVault</span>
          </div>
          
          {isAuthenticated && (
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search passwords..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {isAuthenticated && (
              <>
                <button
                  onClick={onSettings}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>
                
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<LogOut size={16} />}
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;