import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  helperText?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, helperText, ...props }, ref) => {
    return (
      <div>
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input text-base bg-transparent px-4 py-2 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <span className="text-xs text-error">{helperText}</span>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
