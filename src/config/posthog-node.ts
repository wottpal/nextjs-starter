import { PostHog } from 'posthog-node'
import { env } from './environment'

export const posthog =
  env.NEXT_PUBLIC_PRODUCTION_MODE && env.NEXT_PUBLIC_POSTHOG_KEY
    ? new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
        host: `${env.NEXT_PUBLIC_URL}/ingest`,
        flushAt: 1,
        flushInterval: 0,
      })
    : undefined
