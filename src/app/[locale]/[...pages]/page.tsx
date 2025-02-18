import { JsonLd } from '@/components/layout/jsonld'
import { MDX } from '@/components/layout/mdx'
import { Prose } from '@/components/layout/prose'
import { StandardLayout } from '@/components/layout/standard-layout'
import { Wrapper } from '@/components/layout/wrapper'
import { Separator } from '@/components/ui/separator'
import type { Locale } from '@/i18n/routing'
import { findPage } from '@/lib/content-collections/find-page'
import {
  generatePageJsonLd,
  generatePageMetadata,
} from '@/lib/content-collections/get-page-metadata'
import { getVisiblePages } from '@/lib/content-collections/get-pages'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Article } from 'schema-dts'

export async function generateStaticParams({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const allVisiblePages = getVisiblePages(locale)
  return allVisiblePages.map((page) => ({ locale, pages: page.slugItems }))
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: Locale; pages: string[] }> }) {
  const { locale, pages } = await params
  const { page } = findPage(locale, pages)
  if (!page) return {}
  return generatePageMetadata(page)
}

export default async function DefaultPage({
  params,
}: { params: Promise<{ locale: Locale; pages: string[] }> }) {
  const { locale, pages } = await params
  setRequestLocale(locale)

  // Find page
  const { page } = findPage(locale, pages)
  if (!page) notFound()

  const jsonLd = await generatePageJsonLd(page)

  return (
    <>
      <StandardLayout page={page}>
        <Wrapper size="md">
          <Prose>
            <h1 className="mb-5 text-balance break-words font-semibold text-6xl">{page.title}</h1>
            <Separator />
            <MDX code={page.body} />
          </Prose>
        </Wrapper>
      </StandardLayout>

      <JsonLd<Article> data={jsonLd} />
    </>
  )
}
