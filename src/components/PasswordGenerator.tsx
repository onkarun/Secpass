import React, { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { generatePassword, checkPasswordStrength } from '../utils/passwordUtils';
import { PasswordGeneratorOptions, PasswordStrength } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Card, { CardHeader, CardContent, CardFooter } from './ui/Card';

const PasswordGenerator: React.FC = () => {
  const [options, setOptions] = useState<PasswordGeneratorOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(options);
    setGeneratedPassword(newPassword);
    setCopied(false);
  };
  
  const handleCopyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const passwordStrength: PasswordStrength = checkPasswordStrength(generatedPassword);
  
  const strengthColors = {
    'weak': 'bg-red-500',
    'medium': 'bg-yellow-500',
    'strong': 'bg-green-500',
    'very-strong': 'bg-purple-500',
  };
  
  const strengthLabels = {
    'weak': 'Weak',
    'medium': 'Medium',
    'strong': 'Strong',
    'very-strong': 'Very Strong',
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Password Generator</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Input
              type="text"
              value={generatedPassword}
              placeholder="Generated password will appear here"
              readOnly
              fullWidth
              rightIcon={
                <button
                  onClick={handleCopyPassword}
                  className="text-gray-500 hover:text-blue-500 focus:outline-none"
                  disabled={!generatedPassword}
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              }
            />
          </div>
          
          {generatedPassword && (
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${strengthColors[passwordStrength]}`} 
                  style={{ width: passwordStrength === 'weak' ? '25%' : 
                           passwordStrength === 'medium' ? '50%' : 
                           passwordStrength === 'strong' ? '75%' : '100%' }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                {strengthLabels[passwordStrength]}
              </span>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password Length: {options.length}
              </label>
              <input
                type="range"
                min="8"
                max="32"
                value={options.length}
                onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeUppercase}
                  onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeLowercase}
                  onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeNumbers}
                  onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeSymbols}
                  onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Symbols (!@#$)</span>
              </label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGeneratePassword} 
          fullWidth
          leftIcon={<RefreshCw size={16} />}
        >
          Generate Password
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordGenerator;