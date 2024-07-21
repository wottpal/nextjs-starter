export const defaultLocale = 'en' as const
export const locales = ['en', 'de'] as const
export const locale = process.env.SITE_LOCALE || defaultLocale
