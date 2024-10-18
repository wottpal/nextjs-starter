import type { Locale } from '@/i18n/routing'
import { getVisiblePages } from './get-visible-pages'

export const findPage = (locale: Locale, pathItems: string[]) => {
  const pathname = `/${pathItems.join('/')}`
  const pages = getVisiblePages(locale).filter((page) => page.defaultPathname === pathname)

  if (pages.length > 1) {
    throw new Error(`Multiple pages found at ${pathItems.join('/')} (${locale})`)
  }
  const page = pages[0]

  return {
    page,
  }
}
