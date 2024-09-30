import { Prose } from '@/components/layout/prose'
import { Wrapper } from '@/components/layout/wrapper'
import { MDX } from '@/components/mdx'
import { notFound } from 'next/navigation'
import { findPage } from './utils/find-page'
import { getVisiblePages } from './utils/get-visible-pages'

export const revalidate = 7200 // Revalidate every 2 hours

export function generateStaticParams() {
  const allVisiblePages = getVisiblePages()
  return allVisiblePages.map((page) => ({ pages: page.slugItems }))
}

export default async function DefaultPage({ params }: { params: Promise<{ pages: string[] }> }) {
  const { page } = findPage((await params).pages)
  if (!page) notFound()

  return (
    <Wrapper>
      <Prose>
        <MDX code={page.body} />
      </Prose>
    </Wrapper>
  )
}
