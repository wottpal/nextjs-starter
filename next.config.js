import { withContentCollections } from '@content-collections/next'
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
}

// next-intl
const withNextIntl = createNextIntlPlugin()
nextConfig = withNextIntl(nextConfig)

// content-collections
// IMPORTANT: Must be the last plugin
nextConfig = withContentCollections(nextConfig)

export default nextConfig
