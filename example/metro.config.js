const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');
const modules = Object.keys({ ...pak.peerDependencies });

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const { resolver } = defaultConfig;

const config = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,

    blacklistRE: exclusionList(modules.map(m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`))),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  },
};

config.resolver.resolverMainFields.unshift('sbmodern');

// https://docs.expo.dev/versions/latest/config/metro/#mocking-modules
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Excludes modules incompatible with the Expo managed workflow from example app
  if (
    moduleName === 'react-native-device-info' ||
    moduleName === 'react-native-geolocation-service' ||
    moduleName === 'react-native-permissions' ||
    moduleName === 'react-native-sensors' ||
    moduleName === '@react-navigation/native' ||
    moduleName === '@react-native-firebase/app' ||
    moduleName === '@react-native-firebase/messaging' ||
    moduleName === 'react-native-linear-gradient'
  ) {
    return { type: 'empty' };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
