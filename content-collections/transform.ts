import type { Context, Schema } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypeSlug from 'rehype-slug'
import remarkLintFinalNewline from 'remark-lint-final-newline'
import remarkMdx from 'remark-mdx'
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import { env } from '../src/config/environment'
import type { Locale } from '../src/config/locales'
import type { baseSchema } from './schema'

export const transformPage = async (
  document: Schema<'frontmatter', ReturnType<typeof baseSchema>>,
  context: Context,
) => {
  const body = await compileMDX(context, document, {
    remarkPlugins: [remarkMdx, remarkPresetLintRecommended, [remarkLintFinalNewline, false]],
    rehypePlugins: [rehypeSlug],
  })

  // Page properties
  const locale = document._meta.filePath.split('/')[0] as Locale
  const url = `${env.NEXT_PUBLIC_URL}${document.slug}`
  const slugItems = document.slug.split('/').slice(1)

  // Populate page's document object
  return {
    ...document,
    body,
    locale,
    url,
    slugItems,
  }
}
