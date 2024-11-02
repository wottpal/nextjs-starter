import { proseVariants } from '@/components/layout/prose'
import type { Locale } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { getVisiblePages } from '../[...pages]/utils/get-visible-pages'

export const revalidate = 7200 // Revalidate every 2 hours

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Metadata')
  const allBlogPosts = getVisiblePages(locale, ['blog'])

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
