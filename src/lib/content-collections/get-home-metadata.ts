import { env } from '@/config/env'
import { type Locale, locales } from '@/i18n/routing'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import type { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import type { ImageObject, Organization, Person, WebSite, WithContext } from 'schema-dts'
import manifest from '../../app/manifest'
import { getHomePage } from './get-pages'

export async function generateHomeMetadata() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('Metadata')
  const homePage = getHomePage(locale)

  // OG images
  const ogBannerUrl = `${env.NEXT_PUBLIC_URL}/og/banner.jpg`
  const ogLogoUrl = `${env.NEXT_PUBLIC_URL}/og/logo.jpg`
  const ogBanner = {
    url: ogBannerUrl,
    width: 1200,
    height: 630,
    alt: homePage.metaTitle || homePage.title,
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
    title: homePage.metaTitle || homePage.title,
    applicationName: t('name'),
    publisher: t('author'),
    description: homePage.metaDescription,
    keywords: homePage.metaKeywords,
    alternates: homePage.alternates,
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
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
      siteName: t('name'),
      title: homePage.metaTitle || homePage.title,
      description: homePage.metaDescription,
      images: [ogBanner],
      locale,
      alternateLocale: locales.filter((l) => l !== locale),
    },
    twitter: {
      images: [ogBanner],
      description: homePage.metaDescription,
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
  const image: ImageObject | undefined = ogBanner && {
    '@type': 'ImageObject',
    url: ogBanner.url,
    height: ogBanner.height.toString(),
    width: ogBanner.width.toString(),
    caption: ogBanner.alt,
  }

  // TODO
  const author: Person | Organization = {
    '@type': 'Person',
    // '@type': 'Organization',
    name: t('Metadata.author'),
  }
  // TODO
  const publisher: Person | Organization = {
    '@type': 'Person',
    // '@type': 'Organization',
    name: t('Metadata.author'),
    contactPoint: {
      '@type': 'ContactPoint',
      email: t('Metadata.email'),
    },
    //   logo: {
    //     '@type': 'ImageObject',
    //     url: meta.other['og:logo'],
    //     width: '512',
    //     height: '512',
    //   },
    //   sameAs: [
    //     t('Links.twitter'),
    //   ],
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
    name: t('Metadata.name'),
    headline: meta.title,
    description: meta.description,
    dateCreated: dayjs('2025-03-01').toISOString(),
    dateModified: dayjs().toISOString(),
    image,
    keywords: meta.keywords,
    author,
    publisher,
    copyrightYear: dayjs().year(),
    copyrightHolder: author,
  } satisfies WithContext<WebSite>
}
