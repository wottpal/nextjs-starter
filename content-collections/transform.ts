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
import type { baseSchema } from './schema'
import type { Alternates, Locale, PageCollection } from './types'

type TBaseSchema = Schema<'frontmatter', ReturnType<typeof baseSchema>>

// IMPORTANT: Also defined in @/i18n/routing.ts
const DEFAULT_LOCALE = 'en'

export const transformPage = async (document: TBaseSchema, context: Context<TBaseSchema>) => {
  const page = populateDocumentProperties(document)
  const body = await compileMDX(context, document, {
    remarkPlugins: [remarkMdx, remarkPresetLintRecommended, [remarkLintFinalNewline, false]],
    rehypePlugins: [rehypeSlug],
  })

  const { alternates, pathnames, defaultPathname } = await getAlternates(page, context)

  return { ...page, body, alternates, pathnames, defaultPathname }
}

function populateDocumentProperties(
  document: Schema<'frontmatter', ReturnType<typeof baseSchema>>,
) {
  // Page properties
  const locale = document._meta.filePath.split('/')[0] as Locale
  const url = `${env.NEXT_PUBLIC_URL}/${locale}${document.slug}`
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
  const defaultPage = alternatePages.find((altPage) => altPage.locale === DEFAULT_LOCALE) || page

  const alternates: Alternates = {
    canonical: page.url,
    languages: alternatePages.reduce(
      (acc, altPage) => {
        acc[altPage.locale] = altPage.url
        return acc
      },
      { 'x-default': `${env.NEXT_PUBLIC_URL}${defaultPage.slug}` } as Alternates['languages'],
    ),
  }

  const pathnames = alternatePages.reduce(
    (acc, altPage) => {
      acc[altPage.locale] = altPage.slug
      return acc
    },
    { [page.locale]: page.slug } as Record<Locale, string>,
  )
  const defaultPathname = pathnames[DEFAULT_LOCALE]

  return { alternates, defaultPage, alternatePages, pathnames, defaultPathname }
}
