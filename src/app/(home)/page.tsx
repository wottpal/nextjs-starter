import { allLegalPages } from 'content-collections'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function HomePage() {
  const t = await getTranslations('Metadata')

  return (
    <main className="flex grow flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="font-bold text-2xl tracking-tight">{t('title')}</h3>
        <p className="text-muted-foreground text-sm">{t('description')}</p>
      </div>

      <footer className="prose prose-neutral dark:prose-invert prose-sm flex items-center gap-2 opacity-50">
        {allLegalPages.map((page) => {
          return (
            <Link key={page.slug} href={page.slug}>
              {page.title}
            </Link>
          )
        })}
      </footer>
    </main>
  )
}
