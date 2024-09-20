import { createEnv } from '@t3-oss/env-nextjs'
import { type RefinementCtx, z } from 'zod'
import { getUrl } from './get-url'
import { locales } from './locales'

const preprocessBoolean = z.preprocess((v: unknown) => v === 'true' || v === '1', z.boolean())

const isProduction =
  process.env.NEXT_PUBLIC_PRODUCTION_MODE === 'true' ||
  process.env.NEXT_PUBLIC_PRODUCTION_MODE === '1'

const requiredInProduction = (val: unknown, ctx: RefinementCtx) => {
  if (isProduction && !val) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Value required in production mode',
    })
  }
}

export const env = createEnv({
  /*
   * Serverside environment variables
   */
  server: {
    SITE_PASSWORD: z.string().optional(),
  },

  /*
   * Clientside environment variables.
   */
  client: {
    NEXT_PUBLIC_URL: z.preprocess((_) => getUrl(false), z.string()),

    NEXT_PUBLIC_SITE_LOCALE: z.enum(locales),

    NEXT_PUBLIC_DEVELOPMENT_MODE: preprocessBoolean,
    NEXT_PUBLIC_PREVIEW_MODE: preprocessBoolean,
    NEXT_PUBLIC_STAGING_MODE: preprocessBoolean,
    NEXT_PUBLIC_PRODUCTION_MODE: preprocessBoolean,

    NEXT_PUBLIC_SHOW_ALL_PAGES: preprocessBoolean,

    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(), // Consider: `superRefine(requiredInProduction)`
  },

  /*
   * Link environment variables to their runtime values.
   */
  runtimeEnv: {
    SITE_PASSWORD: process.env.SITE_PASSWORD,

    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,

    NEXT_PUBLIC_SITE_LOCALE: process.env.NEXT_PUBLIC_SITE_LOCALE,

    NEXT_PUBLIC_DEVELOPMENT_MODE: process.env.NEXT_PUBLIC_DEVELOPMENT_MODE,
    NEXT_PUBLIC_PREVIEW_MODE: process.env.NEXT_PUBLIC_PREVIEW_MODE,
    NEXT_PUBLIC_STAGING_MODE: process.env.NEXT_PUBLIC_STAGING_MODE,
    NEXT_PUBLIC_PRODUCTION_MODE: process.env.NEXT_PUBLIC_PRODUCTION_MODE,

    NEXT_PUBLIC_SHOW_ALL_PAGES: process.env.NEXT_PUBLIC_SHOW_ALL_PAGES,

    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },
})
