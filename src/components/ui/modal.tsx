'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './dialog';
import { cn } from '@/shared/lib/utils';

const modalVariants = cva(
  'w-full bg-[var(--washi-cream)] text-[var(--charcoal-ink)] border border-[var(--bamboo-border)] shadow-xl transition-all duration-200 dark:bg-[#1a1918] dark:text-[#f2eada] dark:border-[#383530]',
  {
    variants: {
      size: {
        sm: 'max-w-sm p-4 rounded-xl',
        default: 'max-w-lg p-6 rounded-2xl',
        lg: 'max-w-2xl p-6 rounded-2xl',
        xl: 'max-w-4xl p-8 rounded-3xl',
        full: 'max-w-[95vw] h-[90vh] p-6 rounded-2xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size,
  className,
  id,
  'aria-labelledby': ariaLabelledBy,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        id={id}
        aria-labelledby={ariaLabelledBy}
        className={cn(modalVariants({ size }), className)}
      >
        {(title || description) && (
          <DialogHeader className="text-right">
            {title && (
              <DialogTitle className="text-xl font-bold font-[family-name:var(--font-readex)]">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-sm text-[var(--muted-umeboshi)] mt-1 font-[family-name:var(--font-ibm-plex)] leading-relaxed dark:text-[#a09a8e]">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className="py-2">{children}</div>

        {footer && <DialogFooter className="mt-4 gap-2 sm:justify-start">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export { modalVariants };

