'use client';

import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function stripPassword(u: User & { password: string }): User {
  return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('swayam_user');
    return stored ? (JSON.parse(stored) as User) : null;
  });
  const [isLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('swayam_users') || '[]') as (User & { password: string })[];
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const userWithoutPassword = stripPassword(found);
      setUser(userWithoutPassword);
      localStorage.setItem('swayam_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('swayam_users') || '[]') as (User & { password: string })[];
    if (users.find((u) => u.email === email)) return false;
    const newUser = { id: Date.now().toString(), name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('swayam_users', JSON.stringify(users));
    const userWithoutPassword = stripPassword(newUser);
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
