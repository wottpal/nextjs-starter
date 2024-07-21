import { MDXContent } from '@content-collections/mdx/react'
import type { ComponentProps, FC } from 'react'

type MDXContentProps = ComponentProps<typeof MDXContent>
export const MDX: FC<MDXContentProps> = ({ code, components, ...rest }) => {
  return (
    <article>
      <MDXContent
        code={code}
        components={{
          ...components,
          // ComponentA,
        }}
        {...rest}
      />
    </article>
  )
}
