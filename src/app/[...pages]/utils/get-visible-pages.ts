import { env } from '@/config/environment'
import { type Locale, locale as siteLocale } from '@/config/locales'
import { allPages } from 'content-collections'
import dayjs from 'dayjs'

export const getVisiblePages = (collections?: 'blog', locale?: Locale) => {
  const _locale = locale || siteLocale

  return allPages.filter(
    (page) =>
      // Page must match locale
      page.locale === _locale &&
      // If given, filter by collection(s)
      (!collections?.length || (page.collection && collections.includes(page.collection))) &&
      // Page filename must not start with an underscore (i.e. `_home.mdx`)
      !page._meta.fileName.startsWith('_') &&
      // Page must not be hidden
      (env.NEXT_PUBLIC_SHOW_ALL_PAGES || !page.hidden) &&
      // Page's date must not be in the future or not set
      (env.NEXT_PUBLIC_SHOW_ALL_PAGES || !dayjs().isBefore(dayjs(page.datePublished), 'day')),
  )
}
