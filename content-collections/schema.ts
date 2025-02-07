import { z } from 'zod'

export const baseSchema = () => ({
  // Common Properties
  slug: z.string().regex(/^(\/|\/([a-z0-9]+[-a-z0-9]*)+(\/([a-z0-9]+[-a-z0-9]*)+)*)$/),
  hidden: z.boolean().optional(),

  // Display Properties
  title: z.string(),
  shortTitle: z.string().optional(),
  author: z.string().optional(),

  // Article Properties
  datePublished: z.string().date().optional(),
  dateModified: z.string().date().optional(),

  // SEO Properties
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),

  // Sitemap
  sitemap: z
    .object({
      changeFrequency: z
        .enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'])
        .optional(),
      priority: z.number().min(0).max(1).optional(),
    })
    .optional(),
})
