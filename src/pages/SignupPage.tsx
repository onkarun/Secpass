import React, { useState } from 'react';
import { Shield, AtSign, Key, UserPlus, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent } from '../components/ui/Card';
import { checkPasswordStrength } from '../utils/passwordUtils';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

interface SignupPageProps {
  onSignUp: (email: string, password: string) => void;
  onBackToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignUp, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const passwordStrength = checkPasswordStrength(password);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (passwordStrength === 'weak') {
      setError('Please use a stronger password');
      return;
    }
    
    try {
      setIsLoading(true);
      await onSignUp(email, password);
      // If onSignUp doesn't throw, the user will be redirected by the parent component
    } catch (err) {
      setError('Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-blue-600 dark:text-blue-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Secure your passwords with SecureVault
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded relative\" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                leftIcon={<AtSign size={16} className="text-gray-400" />}
              />
              
              <div>
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  leftIcon={<Key size={16} className="text-gray-400" />}
                />
                {password && (
                  <PasswordStrengthMeter 
                    password={password}
                    strength={passwordStrength}
                  />
                )}
              </div>
              
              <Input
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                leftIcon={<Key size={16} className="text-gray-400" />}
                error={confirmPassword && password !== confirmPassword ? "Passwords don't match" : undefined}
              />
              
              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  leftIcon={<UserPlus size={16} />}
                >
                  Create account
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={onBackToLogin}
                leftIcon={<ArrowLeft size={16} />}
              >
                Back to login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;