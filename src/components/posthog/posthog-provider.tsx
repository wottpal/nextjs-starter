'use client'
import { env } from '@/config/environment'
import posthog from 'posthog-js'
import { PostHogProvider as _PosthogProvider } from 'posthog-js/react'

if (
  typeof window !== 'undefined' &&
  env.NEXT_PUBLIC_PRODUCTION_MODE &&
  env.NEXT_PUBLIC_POSTHOG_KEY &&
  env.NEXT_PUBLIC_POSTHOG_KEY
) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: `${env.NEXT_PUBLIC_URL}/ingest`,
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    debug: false,
  })
}

export function PosthogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <_PosthogProvider client={posthog}>{children}</_PosthogProvider>
}
