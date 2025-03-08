import { NextConfig } from 'next'

type Options = {
  configPath: string
}
declare function createContentCollectionPlugin(
  pluginOptions: Options,
): (nextConfig?: Partial<NextConfig> | Promise<Partial<NextConfig>>) => Promise<Partial<NextConfig>>
declare const withContentCollections: (
  nextConfig?: Partial<NextConfig> | Promise<Partial<NextConfig>>,
) => Promise<Partial<NextConfig>>

export {
  createContentCollectionPlugin,
  createContentCollectionPlugin as createcontentCollectionPlugin,
  withContentCollections,
  withContentCollections as withcontentCollections,
}
