import { env } from '@/config/environment'
import dayjs from 'dayjs'
import type { MetadataRoute } from 'next'
import { getVisiblePages } from './[...pages]/utils/get-visible-pages'

export function generatePagesSitemap() {
  const allVisiblePages = getVisiblePages()

  return allVisiblePages
    .map((page) => {
      return {
        url: page.url,
        // alternates: page.alternates,
        lastModified: dayjs(page.dateModified).format('YYYY-MM-DD'),
        changeFrequency: 'weekly',
        priority: 1 - (page.slugItems.length - 1) / 10, // subtract 0.1 per file-depth
      }
    })
    .sort((a, b) => b.priority - a.priority) as MetadataRoute.Sitemap
}

export function generateDefaultSitemap() {
  const today = dayjs().format('YYYY-MM-DD')

  return [
    {
      url: env.NEXT_PUBLIC_URL,
      // alternates: homePage.alternates,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1,
    },
  ] as MetadataRoute.Sitemap
}

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultSitemap = generateDefaultSitemap()
  const pagesSitemap = generatePagesSitemap()

  return [...defaultSitemap, ...pagesSitemap]
}
