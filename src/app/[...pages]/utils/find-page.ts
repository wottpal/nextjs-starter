import type { Locale } from '@/config/locales'
import _ from 'lodash'
import { getLocale } from 'next-intl/server'
import { getVisiblePages } from './get-visible-pages'

export const findPage = async (slugItems: string[], locale?: Locale, includeParents = true) => {
  const _locale = locale || ((await getLocale()) as Locale)

  // Find the page
  const allVisiblePages = await getVisiblePages(undefined, _locale)
  const pages = allVisiblePages.filter((page) => _.isEqual(page.slugItems, slugItems))
  if (pages.length > 1) {
    throw new Error(`Multiple pages found at ${slugItems.join('/')} (${_locale})`)
  }
  const page = pages[0]

  return {
    page,
  }
}
