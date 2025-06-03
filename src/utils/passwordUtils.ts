import { PasswordStrength, PasswordGeneratorOptions } from '../types';

/**
 * Generates a random password based on provided options
 */
export const generatePassword = (options: PasswordGeneratorOptions): string => {
  const { 
    length, 
    includeUppercase, 
    includeLowercase, 
    includeNumbers, 
    includeSymbols 
  } = options;
  
  let chars = '';
  
  if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) chars += '0123456789';
  if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (chars === '') return '';
  
  let password = '';
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  
  return password;
};

/**
 * Evaluates password strength
 */
export const checkPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return 'weak';
  
  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);
  
  const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
  
  if (length < 8) return 'weak';
  if (length < 10 && varietyCount < 3) return 'weak';
  if (length < 12 && varietyCount < 4) return 'medium';
  if (length >= 12 && varietyCount >= 3) return 'strong';
  if (length >= 16 && varietyCount >= 4) return 'very-strong';
  
  return 'medium';
};

/**
 * Simulates the encryption of a password
 * Note: In a real app, this would use a proper encryption library
 */
export const encryptPassword = (password: string, masterKey: string): string => {
  // This is a placeholder - in a real app you would use a proper encryption library
  // like CryptoJS, Web Crypto API, or similar
  return btoa(`${password}:${masterKey}`);
};

/**
 * Simulates the decryption of a password
 * Note: In a real app, this would use a proper decryption library
 */
export const decryptPassword = (encryptedPassword: string, masterKey: string): string => {
  // This is a placeholder - in a real app you would use a proper decryption library
  try {
    const decrypted = atob(encryptedPassword);
    const parts = decrypted.split(':');
    if (parts[1] === masterKey) {
      return parts[0];
    }
    return '';
  } catch (e) {
    return '';
  }
};