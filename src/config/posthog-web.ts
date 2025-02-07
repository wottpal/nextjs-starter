import PostHog from 'posthog-js-lite'
import { env } from './env'

export const posthog =
  env.NEXT_PUBLIC_PRODUCTION_MODE && env.NEXT_PUBLIC_POSTHOG_KEY && typeof window !== 'undefined'
    ? new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
        host: `${env.NEXT_PUBLIC_URL}/ingest`,
        flushAt: 1,
        flushInterval: 0,
      })
    : undefined
