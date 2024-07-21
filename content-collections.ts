import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { locale } from './src/config/locales'

const posts = defineCollection({
  name: 'posts',
  directory: 'content',
  include: `${locale}/**/*.mdx`,
  exclude: '*/legal/**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    date: z.string().date(),
  }),
  transform: async (document, context) => {
    const locale = document._meta.path.split('/')[0]
    const body = await compileMDX(context, document)
    return {
      ...document,
      locale,
      body,
    }
  },
})

const legals = defineCollection({
  name: 'legals',
  directory: 'content',
  include: `${locale}/**/*.mdx`,
  schema: () => ({
    title: posts.schema.title,
    slug: posts.schema.slug,
    date: posts.schema.date,
  }),
  transform: posts.transform,
})

export default defineConfig({
  collections: [posts, legals],
})
