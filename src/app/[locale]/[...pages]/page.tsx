import { Prose } from '@/components/layout/prose'
import { Wrapper } from '@/components/layout/wrapper'
import { MDX } from '@/components/mdx'
import type { Locale } from '@/i18n/routing'
import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { findPage } from './utils/find-page'
import { getVisiblePages } from './utils/get-visible-pages'

export const revalidate = 7200 // Revalidate every 2 hours

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

  // Enable static rendering
  unstable_setRequestLocale(locale)

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
