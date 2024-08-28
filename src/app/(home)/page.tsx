import { proseVariants } from '@/components/layout/prose'
import { allBlogPosts } from 'content-collections'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function HomePage() {
  const t = await getTranslations('Metadata')

  return (
    <main className="flex grow flex-col items-center justify-center gap-10">
      {/* Header */}
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-3xl tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </header>

      {/* Blog Posts */}
      <section className={proseVariants()}>
        {allBlogPosts.map((page) => (
          <div key={page.slug}>
            <Link href={page.slug}>{page.title}</Link>
          </div>
        ))}
      </section>
    </main>
  )
}
