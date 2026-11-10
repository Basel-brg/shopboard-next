import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--charcoal-ink)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs hover:bg-[var(--charcoal-deep)] active:scale-[0.98]',
        destructive:
          'bg-[var(--vermilion-seal)] text-white shadow-xs hover:opacity-90 active:scale-[0.98]',
        outline:
          'border border-[var(--bamboo-border)] bg-[var(--washi-cream)] text-[var(--charcoal-ink)] hover:bg-black/5 active:scale-[0.98]',
        secondary:
          'bg-[var(--bamboo-tan)] text-[var(--charcoal-deep)] hover:bg-[var(--bamboo-tan)]/80 active:scale-[0.98]',
        ghost:
          'text-[var(--charcoal-ink)] hover:bg-black/5 hover:text-[var(--charcoal-deep)]',
        link: 'text-[var(--charcoal-ink)] underline-offset-4 hover:underline',
        bamboo:
          'bg-[var(--bamboo-green)] text-white shadow-xs hover:bg-[#255c34] active:scale-[0.98]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

