import React from 'react';
import { cn } from '@/shared/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[var(--secondary)] dark:bg-[var(--card)]',
        className
      )}
      {...props}
    />
  );
}

