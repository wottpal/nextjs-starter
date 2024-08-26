import { MDX } from '@/components/mdx'
import { notFound } from 'next/navigation'
import { findPage } from './utils/find-page'
import { getAllVisiblePages } from './utils/get-all-visible-pages'

export const revalidate = 3600 // Revalidate this page every hour

export async function generateStaticParams() {
  const allVisiblePages = await getAllVisiblePages()
  return allVisiblePages.map((page) => ({ pages: page.slugItems }))
}

export default async function DefaultPage({ params }: { params: { pages: string[] } }) {
  const { page } = await findPage(params.pages)
  if (!page) notFound()

  return (
    <div className="prose prose-neutral dark:prose-invert mx-auto mt-10 w-full">
      <MDX code={page.body} />
    </div>
  )
}
