import deepmerge from 'deepmerge'
import { getRequestConfig } from 'next-intl/server'
import { type Locale, routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    // When using Turbopack, this will enable HMR for `en`
    messages:
      locale === 'en'
        ? (await import('../../messages/en.json')).default
        : await getMessages(locale as Locale),
  }
})

async function getMessages(locale: Locale) {
  const defaultMessages = (await import('../../messages/en.json')).default
  const userMessages = (await import(`../../messages/${locale}.json`)).default
  return deepmerge(defaultMessages, userMessages)
}
