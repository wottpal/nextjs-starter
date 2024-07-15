import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const t = await getTranslations('Metadata')

  return (
    <main className="flex grow items-center justify-center">
      {/* Placeholder */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="font-bold text-2xl tracking-tight">{t('title')}</h3>
        <p className="text-muted-foreground text-sm">{t('description')}</p>
      </div>
    </main>
  )
}
