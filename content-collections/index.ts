import { defineCollection, defineConfig } from '@content-collections/core'
import { baseSchema } from './schema'
import { transformPage } from './transform'

const pages = defineCollection({
  name: 'pages',
  directory: '../content',
  include: '**/*.mdx',
  schema: baseSchema,
  transform: transformPage,
})

export default defineConfig({
  collections: [pages],
})
