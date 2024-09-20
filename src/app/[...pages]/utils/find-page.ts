import { type Locale, locale as siteLocale } from '@/config/locales'
import _ from 'lodash'
import { getVisiblePages } from './get-visible-pages'

export const findPage = (slugItems: string[], locale?: Locale, includeParents = true) => {
  const _locale = locale || siteLocale

  // Find the page
  const allVisiblePages = getVisiblePages(undefined, _locale)
  const pages = allVisiblePages.filter((page) => _.isEqual(page.slugItems, slugItems))
  if (pages.length > 1) {
    throw new Error(`Multiple pages found at ${slugItems.join('/')} (${_locale})`)
  }
  const page = pages[0]

  return {
    page,
  }
}
