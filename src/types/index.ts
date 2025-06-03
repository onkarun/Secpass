export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface PasswordEntry {
  id: string;
  userId: string;
  title: string;
  username: string;
  password: string;
  website?: string;
  notes?: string;
  category?: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

export interface PasswordGeneratorOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}