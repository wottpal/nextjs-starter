import manifest from '@/app/manifest'
import { env } from '@/config/environment'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import type { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import type { ImageObject, Organization, WebSite, WithContext } from 'schema-dts'

export async function generateHomeMetadata() {
  const locale = await getLocale()
  const t = await getTranslations('Metadata')

  // OG images
  const ogBannerUrl = `${env.NEXT_PUBLIC_URL}/og/banner.jpg`
  const ogLogoUrl = `${env.NEXT_PUBLIC_URL}/og/logo.jpg`
  const ogBanner = {
    url: ogBannerUrl,
    width: 1200,
    height: 630,
    alt: t('title'),
  } satisfies OpenGraph['images']

  // Icons
  const manifestIcons = ((await manifest()).icons || []).slice(1).map(
    (icon) =>
      ({
        url: icon.src,
        sizes: icon.sizes,
        type: icon.type,
      }) as Icon,
  )

  return {
    title: t('title'),
    applicationName: t('shortTitle'),
    publisher: t('shortTitle'),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
    alternates: {
      canonical: env.NEXT_PUBLIC_URL,
      // languages:
    },
    robots: {
      follow: env.NEXT_PUBLIC_PRODUCTION_MODE && !env.SITE_PASSWORD,
      index: env.NEXT_PUBLIC_PRODUCTION_MODE && !env.SITE_PASSWORD,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      type: 'website',
      url: env.NEXT_PUBLIC_URL,
      siteName: t('shortTitle'),
      locale,
      title: t('title'),
      description: t('description'),
      images: [ogBanner],
    },
    twitter: {
      images: [ogBanner],
      description: t('description'),
      card: 'summary_large_image',
      // site: '@dennis_zoma',
      // creator: '@dennis_zoma',
    },
    icons: {
      icon: manifestIcons,
    },
    other: {
      'og:logo': ogLogoUrl,
    },
  } satisfies Metadata
}

export async function generateHomeJsonLd() {
  const t = await getTranslations()
  const meta = await generateHomeMetadata()

  const ogBanner = meta.openGraph.images[0]
  const image: ImageObject = {
    '@type': 'ImageObject',
    url: ogBanner.url,
    height: ogBanner.height.toString(),
    width: ogBanner.width.toString(),
    caption: ogBanner.alt,
  }

  const publisher: Organization = {
    '@type': 'Organization',
    name: t('Metadata.shortTitle'),
    logo: {
      '@type': 'ImageObject',
      url: meta.other['og:logo'],
      width: '512',
      height: '512',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: t('Metadata.email'),
    },
    // TODO
    // sameAs: [t('Links.x'), t('Links.github'), t('Links.linkedin')],
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': meta.alternates.canonical,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': meta.alternates.canonical,
    },
    url: meta.openGraph.url,
    inLanguage: meta.openGraph.locale,
    name: t('Metadata.shortTitle'),
    headline: meta.title,
    description: meta.description,
    dateCreated: dayjs('2024-08-01').toISOString(),
    dateModified: dayjs().toISOString(),
    image,
    keywords: meta.keywords,
    publisher,
    copyrightYear: dayjs().year(),
    copyrightHolder: {
      '@type': 'Organization',
      name: t('Metadata.shortTitle'),
    },
  } satisfies WithContext<WebSite>
}
