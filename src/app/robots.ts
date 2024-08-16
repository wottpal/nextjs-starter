import { env } from '@/config/environment'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: env.NEXT_PUBLIC_URL,
    // TODO
    // sitemap: `${env.NEXT_PUBLIC_URL}/sitemap.xml`,
  }
}
