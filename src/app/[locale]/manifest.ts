import type { MetadataRoute } from 'next'
import { getTranslations } from 'next-intl/server'

// TODO IMPORTANT: Not working
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations('Metadata')

  return {
    name: t('title'),
    short_name: t('shortTitle'),
    description: t('description'),
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
