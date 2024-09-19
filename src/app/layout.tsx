import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { env } from '@/config/environment'
import { cn } from '@/utils/cn'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'
import type { Viewport } from 'next'
import dynamic from 'next/dynamic'
import { generateHomeMetadata } from './(home)/utils/get-home-metadata'

const PosthogPageView = dynamic(() => import('../components/posthog/posthog-page-view'), {
  ssr: false,
})

export async function generateMetadata() {
  return await generateHomeMetadata()
}

export const viewport: Viewport = {
  maximumScale: 1,
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
            {!!env.NEXT_PUBLIC_PRODUCTION_MODE && <PosthogPageView />}
          </NextIntlClientProvider>
        </ThemeProvider>

        {/* Vercel Analytics */}
        {!!env.NEXT_PUBLIC_PRODUCTION_MODE && <Analytics />}
      </body>
    </html>
  )
}
