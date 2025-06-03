import React from 'react';
import { PasswordStrength } from '../types';

interface PasswordStrengthMeterProps {
  password: string;
  strength: PasswordStrength;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password, strength }) => {
  if (!password) {
    return null;
  }
  
  const getColor = (strength: PasswordStrength) => {
    switch (strength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      case 'very-strong':
        return 'bg-purple-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  const getLabel = (strength: PasswordStrength) => {
    switch (strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      case 'very-strong':
        return 'Very Strong';
      default:
        return 'No Password';
    }
  };
  
  const getWidth = (strength: PasswordStrength) => {
    switch (strength) {
      case 'weak':
        return '25%';
      case 'medium':
        return '50%';
      case 'strong':
        return '75%';
      case 'very-strong':
        return '100%';
      default:
        return '0%';
    }
  };
  
  return (
    <div className="mt-2">
      <div className="flex items-center">
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getColor(strength)} transition-all duration-300`} 
            style={{ width: getWidth(strength) }}
          ></div>
        </div>
        <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
          {getLabel(strength)}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;