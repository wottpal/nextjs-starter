import { Toaster } from '@/components/ui/sonner'
import { env } from '@/config/env'
import { type Locale, locales } from '@/i18n/routing'
import Posthog from '@/lib/posthog'
import { cn } from '@/utils/cn'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NavigationGuardProvider } from 'next-navigation-guard'
import { ThemeProvider } from 'next-themes'
import { redirect } from 'next/navigation'
import { type ReactNode, Suspense } from 'react'
import { generateHomeMetadata } from '../../lib/content-collections/get-home-metadata'
import './(home)/styles/globals.css'
import { fontStyles } from './(home)/styles/fonts'

// IMPORTANT: Adding `dynamicParams = false` currently breaks revalidation.
//            See https://github.com/amannn/next-intl/issues/1467
export const dynamicParams = false

// IMPORTANT: Increase once we have a proper revalidation strategy.
export const revalidate = 30

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  return await generateHomeMetadata()
}

export default async function RootLayout({
  children,
  params,
}: { children: ReactNode; params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) redirect('/')
  setRequestLocale(locale)

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} dir="ltr" className={cn(fontStyles)} suppressHydrationWarning>
      <body className="relative flex h-full min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Toaster />

            {children}

            {/* Posthog Analytics */}
            {!!env.NEXT_PUBLIC_PRODUCTION_MODE && (
              <NavigationGuardProvider>
                <Suspense children={<Posthog />} />
              </NavigationGuardProvider>
            )}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
