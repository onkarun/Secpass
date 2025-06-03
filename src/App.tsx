import React, { useState, useEffect } from 'react';
import { PasswordEntry } from './types';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/layout/Header';
import useDarkMode from './hooks/useDarkMode';

// Mock data for demo purposes
const mockPasswords: PasswordEntry[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Gmail',
    username: 'user@example.com',
    password: 'StrongP@ssw0rd123',
    website: 'gmail.com',
    notes: 'Personal Gmail account',
    category: 'Email',
    favorite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'user1',
    title: 'GitHub',
    username: 'developer123',
    password: 'C0d3rP@ss456!',
    website: 'github.com',
    notes: 'Work GitHub account',
    category: 'Work',
    favorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Netflix',
    username: 'movies@example.com',
    password: 'N3tfl1xAndCh1ll!',
    website: 'netflix.com',
    notes: 'Family account',
    category: 'Entertainment',
    favorite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passwords, setPasswords] = useState<PasswordEntry[]>(mockPasswords);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  
  const handleLogin = (email: string, password: string) => {
    console.log('Logging in with:', email, password);
    setIsAuthenticated(true);
    setShowLogin(false);
  };
  
  const handleSignup = (email: string, password: string) => {
    console.log('Creating account with:', email, password);
    setIsAuthenticated(true);
    setShowSignup(false);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(false);
    setShowSignup(false);
  };
  
  const handleGetStarted = () => {
    setShowLogin(true);
  };
  
  const handleAddPassword = (password: Omit<PasswordEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const newPassword: PasswordEntry = {
      ...password,
      id: Math.random().toString(36).substring(2, 9),
      userId: 'user1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setPasswords([...passwords, newPassword]);
  };
  
  const handleUpdatePassword = (id: string, password: Omit<PasswordEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    setPasswords(passwords.map(entry => 
      entry.id === id 
        ? { 
            ...entry, 
            ...password, 
            updatedAt: new Date().toISOString() 
          } 
        : entry
    ));
  };
  
  const handleDeletePassword = (id: string) => {
    setPasswords(passwords.filter(entry => entry.id !== id));
  };
  
  const handleToggleFavorite = (id: string, favorite: boolean) => {
    setPasswords(passwords.map(entry => 
      entry.id === id 
        ? { ...entry, favorite } 
        : entry
    ));
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  if (!isAuthenticated) {
    if (showSignup) {
      return <SignupPage onSignUp={handleSignup} onBackToLogin={() => setShowSignup(false)} />;
    }
    if (showLogin) {
      return <LoginPage onLogin={handleLogin} onSignUp={() => setShowSignup(true)} />;
    }
    return <HomePage onGetStarted={handleGetStarted} />;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onSearch={handleSearch}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      
      <main className="flex-1">
        <DashboardPage
          passwords={passwords}
          onAddPassword={handleAddPassword}
          onUpdatePassword={handleUpdatePassword}
          onDeletePassword={handleDeletePassword}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>
    </div>
  );
}

export default App;