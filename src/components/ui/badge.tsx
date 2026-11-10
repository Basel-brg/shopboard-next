import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs',
        secondary:
          'border-transparent bg-[var(--bamboo-tan)] text-[var(--charcoal-deep)]',
        destructive:
          'border-transparent bg-[var(--vermilion-seal)] text-white shadow-xs',
        outline:
          'border border-[var(--bamboo-border)] text-[var(--charcoal-ink)] bg-[var(--washi-cream)]',
        editorial:
          'border-transparent bg-[var(--charcoal-deep)] text-[var(--washi-ivory)] shadow-xs',
        discount:
          'border-transparent bg-[var(--vermilion-seal)] text-white shadow-xs',
        green:
          'border-transparent bg-[var(--bamboo-green)] text-white shadow-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

