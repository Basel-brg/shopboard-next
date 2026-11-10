import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-xl border border-[var(--bamboo-border)] bg-white px-3.5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--muted-umeboshi)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--charcoal-ink)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          hasError && 'border-[var(--vermilion-seal)] focus-visible:ring-[var(--vermilion-seal)]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };

