import { createContentCollectionPlugin } from '@content-collections/next'
import createWithBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

let nextConfig: NextConfig = {
  // Build Mode (`standalone` for self-hosted builds)
  output: process.env.NEXT_OUTPUT as 'standalone' | undefined,
  // Biome
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Experimental Features
  experimental: {
    ppr: true,
    // reactCompiler: true,
    // dynamicIO: true,
  },
  // Posthog Rewrites
  skipTrailingSlashRedirect: true,
  async rewrites() {
    if (!process.env.NEXT_PUBLIC_PRODUCTION_MODE) return []
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://eu.i.posthog.com/decide',
      },
    ]
  },
}

// bundle-analyzer
const withBundleAnalyzer = createWithBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
nextConfig = withBundleAnalyzer(nextConfig)

// next-intl
const withNextIntl = createNextIntlPlugin()
nextConfig = withNextIntl(nextConfig)

// content-collections
// IMPORTANT: Must be the last plugin
const withContentCollections = createContentCollectionPlugin({
  configPath: './content-collections/index.ts',
})
nextConfig = withContentCollections(nextConfig)

export default nextConfig
