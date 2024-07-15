import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

const withNextIntl = createNextIntlPlugin()
nextConfig = withNextIntl(nextConfig)

export default nextConfig
