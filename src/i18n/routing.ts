import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const defaultLocale = 'en'

export const localePrefixes = {
  en: '/en',
  de: '/de',
}

export type Locale = keyof typeof localePrefixes

export const routing = defineRouting({
  locales: Object.keys(localePrefixes) as Locale[],
  defaultLocale,
  localePrefix: {
    mode: 'as-needed',
    prefixes: localePrefixes,
  },
  alternateLinks: false,
})

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
