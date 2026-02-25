'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlayCircle, FileText, BarChart2, Settings, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/interview', icon: PlayCircle, label: 'Start Interview' },
  { href: '/reports', icon: BarChart2, label: 'Reports' },
  { href: '/resume', icon: FileText, label: 'Resume' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <Brain className="w-7 h-7 text-indigo-600" />
        <span className="text-xl font-bold text-gray-900 dark:text-white">Swayam AI</span>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}>
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
