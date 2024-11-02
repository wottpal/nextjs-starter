import type { Locale } from '@/i18n/routing'
import _ from 'lodash'
import { getVisiblePages } from './get-visible-pages'

export const findPage = (locale: Locale, slugItems: string[]) => {
  const pages = getVisiblePages(locale).filter((page) => _.isEqual(page.slugItems, slugItems))

  if (pages.length > 1) {
    throw new Error(`Multiple pages found at ${slugItems.join('/')} (${locale})`)
  }
  const page = pages[0]

  return {
    page,
  }
}
