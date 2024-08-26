import { env } from '@/config/environment'
import type { Locale } from '@/config/locales'
import { allPages } from 'content-collections'
import dayjs from 'dayjs'
import { getLocale } from 'next-intl/server'

export const getAllVisiblePages = async (locale?: Locale) => {
  const _locale = locale || ((await getLocale()) as Locale)
  const forceShowAllPages = env.NEXT_PUBLIC_DEVELOPMENT_MODE

  return allPages.filter(
    (page) =>
      // Page must match locale
      page.locale === _locale &&
      // Page filename must not start with an underscore
      !page._meta.fileName.startsWith('_') &&
      // Page must not be hidden
      (forceShowAllPages || !page.hidden) &&
      // Page's date must not be in the future or not set
      (forceShowAllPages || !dayjs().isBefore(dayjs(page.date), 'day')),
  )
}
