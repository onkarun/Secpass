import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Edit, Trash, Star, StarOff } from 'lucide-react';
import { PasswordEntry as PasswordEntryType } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';

interface PasswordEntryProps {
  entry: PasswordEntryType;
  onEdit: (entry: PasswordEntryType) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, favorite: boolean) => void;
}

const PasswordEntry: React.FC<PasswordEntryProps> = ({ 
  entry, 
  onEdit, 
  onDelete,
  onToggleFavorite
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const copyPassword = () => {
    navigator.clipboard.writeText(entry.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleEdit = () => {
    onEdit(entry);
  };
  
  const handleDelete = () => {
    onDelete(entry.id);
  };
  
  const handleToggleFavorite = () => {
    onToggleFavorite(entry.id, !entry.favorite);
  };
  
  const maskedPassword = '•'.repeat(Math.min(10, entry.password.length));
  
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{entry.title}</h3>
            {entry.website && (
              <a 
                href={entry.website.startsWith('http') ? entry.website : `https://${entry.website}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-blue-500 hover:underline"
              >
                {entry.website}
              </a>
            )}
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`text-gray-400 hover:text-yellow-500 ${entry.favorite ? 'text-yellow-500' : ''}`}
            title={entry.favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {entry.favorite ? <Star size={18} /> : <StarOff size={18} />}
          </button>
        </div>
        
        <div className="space-y-2 mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
            <div className="flex items-center">
              <p className="text-gray-800 dark:text-gray-200">{entry.username}</p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(entry.username);
                }}
                className="ml-2 text-gray-400 hover:text-blue-500"
                title="Copy username"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Password</p>
            <div className="flex items-center">
              <p className="text-gray-800 dark:text-gray-200 font-mono">
                {showPassword ? entry.password : maskedPassword}
              </p>
              <button
                onClick={togglePasswordVisibility}
                className="ml-2 text-gray-400 hover:text-blue-500"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                onClick={copyPassword}
                className="ml-2 text-gray-400 hover:text-blue-500"
                title="Copy password"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
          
          {entry.notes && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm">{entry.notes}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Edit size={14} />}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Trash size={14} />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PasswordEntry;