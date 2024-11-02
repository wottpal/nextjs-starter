import { env } from '@/config/environment'
import type { Locale } from '@/i18n/routing'
import { type Page, allPages } from 'content-collections'
import dayjs from 'dayjs'

export const RESERVED_PATHS = ['home']

export function getVisiblePages(locale: Locale, collections?: Page['collection'][]) {
  return allPages.filter(
    (page) =>
      // Page must match locale
      page.locale.baseName === locale &&
      // If given, filter by collection(s)
      (!collections?.length || (page.collection && collections.includes(page.collection))) &&
      // Page must be visible
      isPageVisible(page),
  )
}

export function isPageVisible(page: Page) {
  return (
    // Page filename must not be reserved
    !RESERVED_PATHS.includes(page.path) &&
    // Page must not be hidden
    (env.NEXT_PUBLIC_SHOW_ALL_PAGES || !page.hidden) &&
    // Page's date must not be in the future or not set
    (env.NEXT_PUBLIC_SHOW_ALL_PAGES || !dayjs().isBefore(dayjs(page.datePublished), 'day'))
  )
}

export function getHomePage(locale: Locale) {
  const homePage = allPages.find((page) => page.locale.baseName === locale && page.path === 'home')

  if (!homePage) {
    throw new Error(`Homepage (${locale}/home.mdx) not found.`)
  }

  return homePage
}
