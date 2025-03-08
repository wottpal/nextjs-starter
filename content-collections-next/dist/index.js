// src/index.ts
import { configureLogging } from "@content-collections/integrations";
var defaultOptions = {
  configPath: "content-collections.ts"
};
var initializedState = {};
function createContentCollectionPlugin(pluginOptions) {
  return async (nextConfig = {}) => {
    const [command] = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
    if (command === "build" || command === "dev") {
      const initialized = initializedState[pluginOptions.configPath];
      if (initialized) {
        return nextConfig;
      }
      initializedState[pluginOptions.configPath] = true;
      const { createBuilder } = await import("@content-collections/core");
      console.log("Starting content-collections", pluginOptions.configPath);
      const builder = await createBuilder(pluginOptions.configPath);
      configureLogging(builder);
      await builder.build();
      if (command === "dev") {
        console.log("start watching ...");
        await builder.watch();
      }
    }
    return nextConfig;
  };
}
var withContentCollections = createContentCollectionPlugin(defaultOptions);
export {
  createContentCollectionPlugin,
  createContentCollectionPlugin as createcontentCollectionPlugin,
  withContentCollections,
  withContentCollections as withcontentCollections
};
