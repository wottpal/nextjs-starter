import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const t = await getTranslations('Metadata')

  return (
    <main className="grow flex items-center justify-center">
      {/* Placeholder */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">{t('title')}</h3>
        <p className="text-sm text-muted-foreground">{t('description')}</p>
      </div>
    </main>
  )
}
