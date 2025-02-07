import { defaultLocale } from '@/i18n/routing'
import { getHomePage } from '@/lib/content-collections/get-pages'
import type { MetadataRoute } from 'next'
import { getTranslations } from 'next-intl/server'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ locale: defaultLocale, namespace: 'Metadata' })
  const homePage = getHomePage(defaultLocale)

  return {
    name: t('name'),
    description: homePage.metaDescription,
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
