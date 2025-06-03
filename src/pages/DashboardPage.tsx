import React, { useState } from 'react';
import { Plus, Folder, Star, Box, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import PasswordEntry from '../components/PasswordEntry';
import PasswordEntryForm from '../components/PasswordEntryForm';
import PasswordGenerator from '../components/PasswordGenerator';
import { PasswordEntry as PasswordEntryType } from '../types';

interface DashboardPageProps {
  passwords: PasswordEntryType[];
  onAddPassword: (password: Omit<PasswordEntryType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdatePassword: (id: string, password: Omit<PasswordEntryType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onDeletePassword: (id: string) => void;
  onToggleFavorite: (id: string, favorite: boolean) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  passwords,
  onAddPassword,
  onUpdatePassword,
  onDeletePassword,
  onToggleFavorite,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<PasswordEntryType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  
  const handleAddNewClick = () => {
    setShowAddForm(true);
    setEditingEntry(null);
  };
  
  const handleEditEntry = (entry: PasswordEntryType) => {
    setEditingEntry(entry);
    setShowAddForm(true);
  };
  
  const handleFormSubmit = (formData: Omit<PasswordEntryType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (editingEntry) {
      onUpdatePassword(editingEntry.id, formData);
    } else {
      onAddPassword(formData);
    }
    setShowAddForm(false);
    setEditingEntry(null);
  };
  
  const handleFormCancel = () => {
    setShowAddForm(false);
    setEditingEntry(null);
  };
  
  const filteredPasswords = passwords.filter((entry) => {
    // Apply search filter
    const matchesSearch = searchQuery
      ? entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.website && entry.website.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (entry.notes && entry.notes.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    
    // Apply category filter
    const matchesCategory = activeCategory
      ? entry.category === activeCategory
      : true;
    
    // Apply favorites filter
    const matchesFavorites = showFavoritesOnly
      ? entry.favorite
      : true;
    
    return matchesSearch && matchesCategory && matchesFavorites;
  });
  
  // Extract unique categories
  const categories = Array.from(new Set(passwords.map(entry => entry.category).filter(Boolean)));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <Button
              fullWidth
              leftIcon={<Plus size={16} />}
              onClick={handleAddNewClick}
            >
              Add New Password
            </Button>
            
            <div className="mt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowPasswordGenerator(!showPasswordGenerator)}
              >
                Password Generator
              </Button>
            </div>
            
            {showPasswordGenerator && (
              <div className="mt-4">
                <PasswordGenerator />
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Categories</h3>
            
            <ul className="space-y-2">
              <li>
                <button
                  className={`flex items-center w-full px-3 py-2 text-left rounded-md transition ${
                    activeCategory === null && !showFavoritesOnly
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => {
                    setActiveCategory(null);
                    setShowFavoritesOnly(false);
                  }}
                >
                  <Box size={16} className="mr-2" />
                  All Items <span className="ml-auto">{passwords.length}</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full px-3 py-2 text-left rounded-md transition ${
                    showFavoritesOnly
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => {
                    setShowFavoritesOnly(true);
                    setActiveCategory(null);
                  }}
                >
                  <Star size={16} className="mr-2" />
                  Favorites
                  <span className="ml-auto">
                    {passwords.filter(entry => entry.favorite).length}
                  </span>
                </button>
              </li>
              
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-left rounded-md transition ${
                      activeCategory === category
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => {
                      setActiveCategory(category);
                      setShowFavoritesOnly(false);
                    }}
                  >
                    <Folder size={16} className="mr-2" />
                    {category}
                    <span className="ml-auto">
                      {passwords.filter(entry => entry.category === category).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4">
          {(showAddForm || editingEntry) ? (
            <div className="mb-6">
              <PasswordEntryForm
                entry={editingEntry || undefined}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {showFavoritesOnly
                    ? 'Favorites'
                    : activeCategory
                    ? activeCategory
                    : 'All Passwords'}
                </h1>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Filter..."
                      className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {filteredPasswords.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery 
                      ? 'No passwords matching your search'
                      : showFavoritesOnly
                      ? 'No favorite passwords yet'
                      : activeCategory
                      ? `No passwords in ${activeCategory}`
                      : 'No passwords yet. Click "Add New Password" to get started.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPasswords.map((entry) => (
                    <PasswordEntry
                      key={entry.id}
                      entry={entry}
                      onEdit={handleEditEntry}
                      onDelete={onDeletePassword}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;