import { JsonLd } from '@/components/layout/jsonld'
import { Logo } from '@/components/layout/logo'
import { StandardLayout } from '@/components/layout/standard-layout'
import type { Locale } from '@/i18n/routing'
import { generateHomeJsonLd } from '@/lib/content-collections/get-home-metadata'
import { getHomePage } from '@/lib/content-collections/get-pages'
import { setRequestLocale } from 'next-intl/server'
import type { WebSite } from 'schema-dts'

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const homePage = getHomePage(locale)
  const jsonLd = await generateHomeJsonLd()

  return (
    <>
      <StandardLayout page={homePage}>
        <div className="flex grow flex-col items-center justify-center gap-4 opacity-25">
          <Logo noLink />
          <div className="max-w-prose text-muted-foreground text-sm">
            {homePage.metaDescription}
          </div>
        </div>
      </StandardLayout>

      <JsonLd<WebSite> data={jsonLd} />
    </>
  )
}
