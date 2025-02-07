import type { Locale } from '@/i18n/routing'
import { areArraysEqual } from '@/utils/array-utils'
import { getVisiblePages } from './get-pages'

export const findPage = (locale: Locale, slugItems: string[]) => {
  const pages = getVisiblePages(locale).filter((page) => areArraysEqual(page.slugItems, slugItems))

  if (pages.length > 1) {
    throw new Error(`Multiple pages found at ${slugItems.join('/')} (${locale})`)
  }
  const page = pages[0]

  return {
    page,
  }
}
