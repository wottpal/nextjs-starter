import { createContentCollectionPlugin } from '@content-collections/next'
import createWithBundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
let nextConfig = {
  // Biome
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Dev Indicators
  devIndicators: {
    appIsrStatus: false,
  },
  // Partial Prerendering
  experimental: {
    ppr: true,
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
