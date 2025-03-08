"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createContentCollectionPlugin: () => createContentCollectionPlugin,
  createcontentCollectionPlugin: () => createContentCollectionPlugin,
  withContentCollections: () => withContentCollections,
  withcontentCollections: () => withContentCollections
});
module.exports = __toCommonJS(src_exports);
var import_integrations = require("@content-collections/integrations");
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
      (0, import_integrations.configureLogging)(builder);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createContentCollectionPlugin,
  createcontentCollectionPlugin,
  withContentCollections,
  withcontentCollections
});
