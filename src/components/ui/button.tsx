/**
 * IMPORTANT: This file is modified from the original shadcn/ui file.
 *            DO NOT OVERWRITE IT WITH THE CLI.
 */

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  'relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-lg font-medium text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/60',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const buttonInnerVariants = cva('inline-flex items-center justify-center gap-1.5', {
  variants: {
    isLoading: {
      true: 'pointer-events-none opacity-0',
    },
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props}>
        <React.Fragment>
          <div className={buttonInnerVariants({ isLoading })}>{children}</div>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoaderCircle className="animate-spin" size={16} />
            </div>
          )}
        </React.Fragment>
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
