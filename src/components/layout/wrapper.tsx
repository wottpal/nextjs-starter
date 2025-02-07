import { type VariantProps, cva } from 'class-variance-authority'
import type { FC } from 'react'

export const wrapperVariants = cva('mx-auto w-full px-6 py-8 sm:px-10 sm:py-12', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

interface WrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {}
export const Wrapper: FC<WrapperProps> = ({ size, className, ...rest }) => (
  <div className={wrapperVariants({ size, className })} {...rest} />
)
