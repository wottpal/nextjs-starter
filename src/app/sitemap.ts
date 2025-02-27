import { type Locale, locales } from '@/i18n/routing'
import dayjs from 'dayjs'
import type { MetadataRoute } from 'next'
import { getHomePage, getVisiblePages } from '../lib/content-collections/get-pages'

function generateHomePageSitemap(locale: Locale) {
  const today = dayjs().format('YYYY-MM-DD')
  const homePage = getHomePage(locale)

  return [
    {
      url: homePage.url,
      alternates: homePage.alternates,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1,
    },
  ] as MetadataRoute.Sitemap
}

function generatePagesSitemap(locale: Locale) {
  const allVisiblePages = getVisiblePages(locale)

  return allVisiblePages
    .map((page) => {
      return {
        url: page.url,
        alternates: page.alternates,
        lastModified: dayjs(page.dateModified).format('YYYY-MM-DD'),
        changeFrequency: page.sitemap?.changeFrequency ?? 'weekly',
        priority: page.sitemap?.priority ?? 1 - (page.slugItems.length - 1) / 20, // Subtract 0.05 per file-depth
      }
    })
    .sort((a, b) => b.priority - a.priority) as MetadataRoute.Sitemap
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemaps: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    sitemaps.push(...generateHomePageSitemap(locale))
    sitemaps.push(...generatePagesSitemap(locale))
  }

  return sitemaps
}
