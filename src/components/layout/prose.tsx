import { cn } from '@/utils/cn'
import { type VariantProps, cva } from 'class-variance-authority'
import type { FC } from 'react'

export const proseVariants = cva(
  cn(
    'prose prose-neutral dark:prose-invert max-w-none',
    'before:prose-p:content-none after:prose-p:content-none', // Disable quotation marks
  ),
  {
    variants: {
      size: {
        sm: 'prose-sm',
        base: 'prose-base',
        lg: 'prose-lg',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
)

interface ProseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof proseVariants> {}
export const Prose: FC<ProseProps> = ({ size, className, ...rest }) => (
  <div className={proseVariants({ size, className })} {...rest} />
)
