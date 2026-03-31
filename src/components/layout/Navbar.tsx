'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Brain } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Swayam AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">Features</Link>
            <Link href="/#how-it-works" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">How It Works</Link>
            {user && <Link href="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">Dashboard</Link>}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar name={user.name} size="sm" />
                <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                <Link href="/signup"><Button variant="primary" size="sm">Get Started</Button></Link>
              </div>
            )}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-3">
          <Link href="/#features" className="block text-sm text-gray-600 dark:text-gray-400">Features</Link>
          <Link href="/#how-it-works" className="block text-sm text-gray-600 dark:text-gray-400">How It Works</Link>
          {!user && (
            <>
              <Link href="/login"><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
              <Link href="/signup"><Button variant="primary" size="sm" className="w-full">Get Started</Button></Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
