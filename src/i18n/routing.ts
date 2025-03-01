import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const defaultLocale = 'en'

export const localePrefixes = {
  en: '/en',
  de: '/de',
}
export const localePrefixMode: 'always' | 'as-needed' = 'as-needed'

export type Locale = keyof typeof localePrefixes

export const locales = Object.keys(localePrefixes) as Locale[]

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: {
    mode: localePrefixMode,
    prefixes: localePrefixes,
  },
  alternateLinks: false,
})

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
