import { Prose } from '@/components/layout/prose'
import { Wrapper } from '@/components/layout/wrapper'
import { MDX } from '@/components/mdx'
import type { Locale } from '@/i18n/routing'
import { findPage } from '@/lib/content-collections/find-page'
import { getVisiblePages } from '@/lib/content-collections/get-pages'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export async function generateStaticParams({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const allVisiblePages = getVisiblePages(locale)
  return allVisiblePages.map((page) => ({
    locale,
    pages: page.defaultPathname.split('/').slice(1),
  }))
}

export default async function DefaultPage({
  params,
}: { params: Promise<{ locale: Locale; pages: string[] }> }) {
  const { locale, pages } = await params
  setRequestLocale(locale)

  // Find page
  const { page } = findPage(locale, pages)
  if (!page) notFound()

  return (
    <Wrapper>
      <Prose>
        <MDX code={page.body} />
      </Prose>
    </Wrapper>
  )
}
