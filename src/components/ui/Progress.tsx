import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  label?: string;
  color?: 'indigo' | 'green' | 'amber' | 'red';
}

export function Progress({ value, max = 100, className, label, color = 'indigo' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('w-full', className)}>
      {label && <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1"><span>{label}</span><span>{Math.round(pct)}%</span></div>}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', {
            'bg-indigo-600': color === 'indigo',
            'bg-green-500': color === 'green',
            'bg-amber-500': color === 'amber',
            'bg-red-500': color === 'red',
          })}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
