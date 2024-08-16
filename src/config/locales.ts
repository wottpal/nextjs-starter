export const defaultLocale = 'en' as const
export const locales = ['en', 'de'] as const
export type Locale = (typeof locales)[number]
export const locale = (process.env.NEXT_PUBLIC_SITE_LOCALE || defaultLocale) as Locale
