import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizePx = { sm: 32, md: 40, lg: 48 };

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  const sizeClasses = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? 'Avatar'}
        width={sizePx[size]}
        height={sizePx[size]}
        className={cn('rounded-full object-cover', sizeClasses[size], className)}
      />
    );
  }
  return (
    <div className={cn('rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold', sizeClasses[size], className)}>
      {initials}
    </div>
  );
}
