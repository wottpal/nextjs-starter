import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const defaultLocale = 'en'

export const localePrefixes = {
  en: '/en',
  de: '/de',
}

// const pathnames = allPages
//   .filter((page) => page.locale === DEFAULT_LOCALE && isPageVisible(page))
//   .reduce(
//     (acc, page) => {
//       acc[page.slug] = page.pathnames
//       return acc
//     },
//     { '/': '/' } as Record<string, Record<string, string> | string>,
//   )

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale,
  localePrefix: {
    mode: 'as-needed',
    prefixes: localePrefixes,
  },
  // pathnames,
})

// export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
