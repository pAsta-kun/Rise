let defaultConfig;

(async () => {
  const { getDefaultConfig } = await import('@expo/metro-config');

  defaultConfig = await getDefaultConfig(__dirname);
  defaultConfig.resolver.assetExts.push('cjs');

})();

module.exports = defaultConfig;
