import { isPageVisible } from '@/app/[locale]/[...pages]/utils/get-visible-pages'
import { allPages } from 'content-collections'
import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

// IMPORTANT: Also defined in content-collections/transform.ts
const DEFAULT_LOCALE = 'en'

const pathnames = allPages
  .filter((page) => page.locale === DEFAULT_LOCALE && isPageVisible(page))
  .reduce(
    (acc, page) => {
      acc[page.slug] = page.pathnames
      return acc
    },
    { '/': '/' } as Record<string, Record<string, string> | string>,
  )

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: DEFAULT_LOCALE,
  pathnames,
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
