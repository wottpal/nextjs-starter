import { defineCollection, defineConfig } from '@content-collections/core'
import { baseSchema, blogPostsSchema } from './schema'
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
  include: `**/*/blog/**/*.mdx`,
  schema: blogPostsSchema,
  transform: transformPage,
})

export default defineConfig({
  collections: [pages, blogPosts],
})
