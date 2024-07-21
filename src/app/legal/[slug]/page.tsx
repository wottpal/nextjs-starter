import { notFound } from 'next/navigation'

import { MDX } from '@/components/mdx'
import { allLegals } from 'content-collections'

export async function generateStaticParams() {
  return allLegals.map((legal) => ({ slug: legal.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = allLegals.find((legal) => legal.slug === params.slug)
  if (!post) return notFound()

  return {
    title: post.title,
  }
}

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const post = allLegals.find((legal) => legal.slug === params.slug)
  if (!post) return notFound()

  return (
    <div className="prose prose-neutral dark:prose-invert mx-auto mt-10 w-full">
      <MDX code={post?.body} />
    </div>
  )
}
