import { type VariantProps, cva } from 'class-variance-authority'
import type { FC } from 'react'

export const wrapperVariants = cva('mx-auto w-full p-5 sm:px-8', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface WrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {}
export const Wrapper: FC<WrapperProps> = ({ size, className, ...rest }) => (
  <div className={wrapperVariants({ size, className })} {...rest} />
)
