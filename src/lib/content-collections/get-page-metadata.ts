import { env } from '@/config/env'
import { type Locale, routing } from '@/i18n/routing'
import type { Page } from 'content-collections'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import type { Article, ImageObject, Organization, Person, WithContext } from 'schema-dts'
import { generateHomeMetadata } from './get-home-metadata'
import { generateHomeJsonLd } from './get-home-metadata'
import { getHomePage } from './get-pages'

export async function generatePageMetadata(page: Page) {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('Metadata')

  const homePageMeta = await generateHomeMetadata()

  const title = page.metaTitle || page.title
  const description = page.metaDescription || homePageMeta.description
  // TODO
  // const images = [await generateOgImageMetadata(page)]
  const images = homePageMeta.openGraph.images

  return {
    title,
    description,
    publisher: homePageMeta.publisher,
    keywords: page.metaKeywords,
    alternates: page.alternates,
    openGraph: {
      type: 'article',
      url: page.url,
      siteName: t('name'),
      locale: page.locale.baseName,
      title,
      description,
      images,
      authors: page.author || t('author'),
      tags: page.metaKeywords,
      publishedTime: dayjs(page.datePublished).toISOString(),
      modifiedTime: dayjs(page.dateModified).toISOString(),
      emails: t('email'),
      alternateLocale: routing.locales.filter((l) => l !== locale),
    },
    twitter: {
      title,
      description,
      images,
      card: 'summary_large_image',
      // site: '@dennis_zoma',
      // creator: '@dennis_zoma',
    },
  } satisfies Metadata
}

export async function generatePageJsonLd(page: Page) {
  const pageMeta = await generatePageMetadata(page)
  const homePageMeta = await generateHomeMetadata()
  const homePageJsonLd = await generateHomeJsonLd()

  const keywords = pageMeta.keywords || homePageMeta.keywords
  const author: Person | Organization = page.author
    ? { '@type': 'Person', name: page.author }
    : homePageJsonLd.author

  const ogImage = pageMeta.openGraph.images[0]
  const image: ImageObject | undefined = ogImage && {
    '@type': 'ImageObject',
    url: ogImage.url,
    contentUrl: ogImage.url,
    height: ogImage.height.toString(),
    width: ogImage.width.toString(),
    caption: ogImage.alt,
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': page.alternates.canonical,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': page.alternates.canonical,
      primaryImageOfPage: image,
    },
    url: page.url,
    inLanguage: page.locale.baseName,
    name: pageMeta.title,
    headline: pageMeta.title,
    alternativeHeadline: page.metaTitle,
    description: pageMeta.description,
    dateCreated: dayjs(page.datePublished).toISOString(),
    datePublished: dayjs(page.datePublished).toISOString(),
    dateModified: dayjs(page.dateModified).toISOString(),
    image,
    author,
    keywords,
    publisher: homePageJsonLd.publisher,
    copyrightYear: homePageJsonLd.copyrightYear,
    copyrightHolder: homePageJsonLd.copyrightHolder,
  } satisfies WithContext<Article>
}

export async function generateOgImageMetadata(page: Page) {
  const homePage = await getHomePage(page.locale.baseName)

  // Build the image URL (define `title` and `image` query params)
  const imageUrl = new URL(`${env.NEXT_PUBLIC_URL}/api/og`)
  const title = page?.title || homePage.title
  imageUrl.searchParams.set('title', title)

  return {
    url: imageUrl.toString(),
    width: 1200,
    height: 630,
    alt: page?.metaTitle || page?.title || homePage.metaTitle || homePage.title,
  } satisfies OpenGraph['images']
}
