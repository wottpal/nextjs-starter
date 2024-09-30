import { z } from 'zod'

export const baseSchema = () => ({
  // Common Properties
  slug: z.string().regex(/^(\/|\/[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*)\/?$/),
  hidden: z.boolean().optional(),
  redirects: z.array(z.string()).optional(),

  // Display Properties
  title: z.string(),

  // Article Properties
  datePublished: z.string().date().optional(),
  dateModified: z.string().date().optional(),
})

export const blogPostsSchema = baseSchema
