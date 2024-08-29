import { env } from '@/config/environment'
import type { Locale } from '@/config/locales'
import { allPages } from 'content-collections'
import dayjs from 'dayjs'
import { getLocale } from 'next-intl/server'

export const getVisiblePages = async (collection?: 'blog', locale?: Locale) => {
  const _locale = locale || ((await getLocale()) as Locale)

  const forceShowAllPages = env.NEXT_PUBLIC_DEVELOPMENT_MODE // Shows hidden & unpublished pages during development

  return allPages.filter(
    (page) =>
      // Page must match locale
      page.locale === _locale &&
      // If given, filter by collection
      (!collection || page.collection === 'blog') &&
      // Page filename must not start with an underscore (e.g. useful for `_home.mdx` or `_404.mdx`)
      !page._meta.fileName.startsWith('_') &&
      // Page must not be hidden
      (forceShowAllPages || !page.hidden) &&
      // Page's date must not be in the future or not set
      (forceShowAllPages || !dayjs().isBefore(dayjs(page.datePublished), 'day')),
  )
}
