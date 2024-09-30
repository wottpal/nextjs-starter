import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { type ReactNode, Suspense } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { env } from '@/config/environment'
import { cn } from '@/utils/cn'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'
import Posthog from '@/lib/posthog'
import { generateHomeMetadata } from './(home)/utils/get-home-metadata'

export async function generateMetadata() {
  return await generateHomeMetadata()
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
            {!!env.NEXT_PUBLIC_PRODUCTION_MODE && <Suspense children={<Posthog />} />}
          </NextIntlClientProvider>
        </ThemeProvider>

        {/* Vercel Analytics */}
        {!!env.NEXT_PUBLIC_PRODUCTION_MODE && <Analytics />}
      </body>
    </html>
  )
}
