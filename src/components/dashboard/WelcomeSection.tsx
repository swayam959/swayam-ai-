'use client';

import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Trophy, TrendingUp, Calendar, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const stats = [
  { icon: Trophy, label: 'Interviews Completed', value: '12', color: 'text-indigo-600' },
  { icon: Star, label: 'Average Score', value: '78%', color: 'text-amber-500' },
  { icon: TrendingUp, label: 'Readiness Level', value: 'Improving', color: 'text-green-500' },
  { icon: Calendar, label: 'Last Interview', value: 'Feb 20, 2026', color: 'text-blue-500' },
];

export function WelcomeSection() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0] ?? 'Student'}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{today}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <Card key={label}>
            <CardBody className="flex items-start gap-4">
              <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-0.5">{value}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
