import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { getUrl } from './get-url'

const preprocessBoolean = z.preprocess((v: unknown) => v === 'true' || v === '1', z.boolean())

export const env = createEnv({
  /*
   * Serverside environment variables
   */
  server: {
    SITE_PASSWORD: z.string().optional(),
    SITE_LOCALE: z.string().optional(),
  },

  /*
   * Clientside environment variables.
   */
  client: {
    NEXT_PUBLIC_URL: z.preprocess((_) => getUrl(), z.string()),

    NEXT_PUBLIC_DEVELOPMENT_MODE: preprocessBoolean,
    NEXT_PUBLIC_PREVIEW_MODE: preprocessBoolean,
    NEXT_PUBLIC_STAGING_MODE: preprocessBoolean,
    NEXT_PUBLIC_PRODUCTION_MODE: preprocessBoolean,
  },

  /*
   * Link environment variables to their runtime values.
   */
  runtimeEnv: {
    SITE_PASSWORD: process.env.SITE_PASSWORD,
    SITE_LOCALE: process.env.SITE_LOCALE,

    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_DEVELOPMENT_MODE: process.env.NEXT_PUBLIC_DEVELOPMENT_MODE,
    NEXT_PUBLIC_PREVIEW_MODE: process.env.NEXT_PUBLIC_PREVIEW_MODE,
    NEXT_PUBLIC_STAGING_MODE: process.env.NEXT_PUBLIC_STAGING_MODE,
    NEXT_PUBLIC_PRODUCTION_MODE: process.env.NEXT_PUBLIC_PRODUCTION_MODE,
  },
})
