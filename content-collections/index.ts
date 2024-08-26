import { defineCollection, defineConfig } from '@content-collections/core'
import { locale } from '../src/config/locales'
import { baseSchema, blogPostsSchema, legalPagesSchema } from './schema'
import { transformPage } from './transform'

const pages = defineCollection({
  name: 'pages',
  directory: '../content',
  include: '**/*.mdx',
  schema: baseSchema,
  transform: transformPage,
})

const blogPosts = defineCollection({
  name: 'blogPosts',
  directory: '../content',
  include: `**/${locale}/blog/**/*.mdx`,
  schema: blogPostsSchema,
  transform: transformPage,
})

const legalPages = defineCollection({
  name: 'legalPages',
  directory: '../content',
  include: `**/${locale}/legal/**/*.mdx`,
  schema: legalPagesSchema,
  transform: transformPage,
})

export default defineConfig({
  collections: [pages, blogPosts, legalPages],
})
