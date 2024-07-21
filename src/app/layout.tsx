import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { env } from '@/config/environment'
import { cn } from '@/utils/cn'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import './globals.css'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations('Metadata')

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('shortTitle')}`,
    },
    description: t('description'),
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
    robots: {
      follow: env.NEXT_PUBLIC_PRODUCTION_MODE && !env.SITE_PASSWORD,
      index: env.NEXT_PUBLIC_PRODUCTION_MODE && !env.SITE_PASSWORD,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale,
      url: env.NEXT_PUBLIC_URL,
      siteName: t('description'),
    },
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages({ locale })

  return (
    <html
      lang={locale}
      dir="ltr"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="relative flex h-full min-h-screen flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />

            {children}
          </ThemeProvider>
        </NextIntlClientProvider>

        {!!env.NEXT_PUBLIC_PRODUCTION_MODE && <Analytics />}
      </body>
    </html>
  )
}
