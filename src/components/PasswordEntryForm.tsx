import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { PasswordEntry, PasswordStrength } from '../types';
import { checkPasswordStrength, generatePassword } from '../utils/passwordUtils';
import Button from './ui/Button';
import Input from './ui/Input';
import PasswordStrengthMeter from './PasswordStrengthMeter';

interface PasswordEntryFormProps {
  entry?: PasswordEntry;
  onSubmit: (entry: Omit<PasswordEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const defaultEntry: Omit<PasswordEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  title: '',
  username: '',
  password: '',
  website: '',
  notes: '',
  category: '',
  favorite: false,
};

const PasswordEntryForm: React.FC<PasswordEntryFormProps> = ({ 
  entry, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Omit<PasswordEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>(
    entry ? {
      title: entry.title,
      username: entry.username,
      password: entry.password,
      website: entry.website || '',
      notes: entry.notes || '',
      category: entry.category || '',
      favorite: entry.favorite,
    } : defaultEntry
  );
  
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');
  
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleGeneratePassword = () => {
    const newPassword = generatePassword({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    });
    
    setFormData(prev => ({ ...prev, password: newPassword }));
    setShowPassword(true);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {entry ? 'Edit Password' : 'Add New Password'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Gmail, Twitter, Bank Account"
          required
          fullWidth
        />
        
        <Input
          label="Username or Email"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username@example.com"
          required
          fullWidth
        />
        
        <div>
          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            fullWidth
            rightIcon={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-500 hover:text-blue-500 focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          <PasswordStrengthMeter 
            password={formData.password}
            strength={passwordStrength}
          />
          <div className="mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGeneratePassword}
              leftIcon={<RefreshCw size={14} />}
            >
              Generate Strong Password
            </Button>
          </div>
        </div>
        
        <Input
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
          fullWidth
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add additional notes here..."
            rows={3}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            checked={formData.favorite}
            onChange={(e) => setFormData(prev => ({ ...prev, favorite: e.target.checked }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="favorite" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Mark as favorite
          </label>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {entry ? 'Update' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default PasswordEntryForm;