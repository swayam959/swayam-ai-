import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>{children}</div>;
}

export function CardBody({ className, children }: CardProps) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardProps) {
  return <div className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700', className)}>{children}</div>;
}
