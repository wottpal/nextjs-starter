import { statSync } from 'node:fs'
import path from 'node:path'
import type { Context, Schema } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import dayjs from 'dayjs'
import rehypeSlug from 'rehype-slug'
import remarkLintFinalNewline from 'remark-lint-final-newline'
import remarkMdx from 'remark-mdx'
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import { env } from '../src/config/environment'
import { type Locale, defaultLocale, localePrefixes } from '../src/i18n/routing'
import type { baseSchema } from './schema'
import type { Alternates, PageCollection } from './types'

type TBaseSchema = Schema<'frontmatter', ReturnType<typeof baseSchema>>

export const transformPage = async (document: TBaseSchema, context: Context<TBaseSchema>) => {
  const page = populateDocumentProperties(document)

  const alternatesData = await getAlternates(page, context)

  const body = await compileMDX(context, document, {
    remarkPlugins: [remarkMdx, remarkPresetLintRecommended, [remarkLintFinalNewline, false]],
    rehypePlugins: [rehypeSlug],
  })

  return { ...page, ...alternatesData, body }
}

function populateDocumentProperties(
  document: Schema<'frontmatter', ReturnType<typeof baseSchema>>,
) {
  // Locale details
  const localePathItem = document._meta.filePath.split('/')[0]
  const intlLocale = new Intl.Locale(localePathItem as Locale)
  const locale = {
    baseName: intlLocale.baseName as Locale,
    language: intlLocale.language,
    region: intlLocale.region,
    prefix: localePrefixes[intlLocale.baseName as Locale],
  }

  // Page properties
  const localizedSlug = `${locale.prefix}${document.slug}`
  const url = `${env.NEXT_PUBLIC_URL}${localizedSlug}`
  const slugItems = document.slug.split('/').slice(1)
  const unlocalizedFilePath = document._meta.filePath.split('/').slice(1).join('/')
  const unlocalizedPathItems = document._meta.path.split('/').slice(1)
  const unlocalizedPath = unlocalizedPathItems.join('/')
  const collection =
    unlocalizedPathItems.length > 1 ? (unlocalizedPathItems[0] as PageCollection) : null

  // Populate date properties with file metadata
  const fileStats = statSync(path.join(process.cwd(), 'content', document._meta.filePath))
  const datePublished = document.datePublished || dayjs(fileStats.birthtime).toISOString()
  const dateModified = document.datePublished || datePublished

  return {
    ...document,
    locale,
    url,
    slugItems,
    filePath: unlocalizedFilePath,
    path: unlocalizedPath,
    pathItems: unlocalizedPathItems,
    collection,
    datePublished,
    dateModified,
    content: undefined, // Save file size
  }
}

async function getAlternates(
  page: ReturnType<typeof populateDocumentProperties>,
  context: Context<TBaseSchema>,
) {
  const allDocuments = await context.collection.documents()
  const alternatePages = allDocuments
    .filter((doc) => {
      const unlocalizedFilePath = doc._meta.filePath.split('/').slice(1).join('/')
      return !doc.hidden && page.filePath === unlocalizedFilePath
    })
    .map(populateDocumentProperties)
  const defaultPage =
    alternatePages.find((altPage) => altPage.locale.baseName === defaultLocale) || page

  const alternates: Alternates = {
    canonical: page.url,
    languages: alternatePages.reduce(
      (acc, altPage) => {
        acc[altPage.locale.language] = altPage.url
        return acc
      },
      { 'x-default': `${env.NEXT_PUBLIC_URL}${defaultPage.slug}` } as Alternates['languages'],
    ),
  }

  const pathnames = alternatePages.reduce(
    (acc, altPage) => {
      acc[altPage.locale.baseName] = altPage.slug
      return acc
    },
    { [page.locale.baseName]: page.slug } as Record<Locale, string>,
  )
  const defaultPathname = pathnames[defaultLocale]
  // TODO Postprocess all pathnames required for routing

  return { alternates, pathnames, defaultPathname }
}
