'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option { label: string; value: string; }

interface DropdownProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({ options, value, onChange, placeholder = 'Select...', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:border-indigo-400"
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {options.map(opt => (
            <button key={opt.value} onClick={() => { onChange?.(opt.value); setIsOpen(false); }}
              className={cn('w-full px-3 py-2 text-left text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20', opt.value === value && 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600')}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
