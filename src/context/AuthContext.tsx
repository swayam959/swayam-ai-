'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('swayam_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('swayam_users') || '[]');
    const found = users.find((u: User & { password: string }) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userWithoutPassword } = found;
      setUser(userWithoutPassword);
      localStorage.setItem('swayam_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('swayam_users') || '[]');
    if (users.find((u: User) => u.email === email)) return false;
    const newUser = { id: Date.now().toString(), name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('swayam_users', JSON.stringify(users));
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('swayam_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('swayam_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
