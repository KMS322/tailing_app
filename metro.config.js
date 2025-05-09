/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
// const extraNodeModules = {
//   common: path.join(__dirname, '/../'),
// };
// const watchFolders = [path.join(__dirname, '/../')];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // extraNodeModules: new Proxy(extraNodeModules, {
    //   get: (target, name) =>
    //     //redirects dependencies referenced from common/ to local node_modules
    //     name in target
    //       ? target[name]
    //       : path.join(process.cwd(), `node_modules/${name}`),
    // }),
    blockList: [
      /.*\.git\/.*/,
      /.*\.zip/,
      /.*\.tar/,
      /.*\.gz/,
      /.*\.mp4/,
      /.*\.mov/,
      /.*\.avi/,
      /.*\.pdf/,
      /.*\.psd/,
      /.*\.ai/,
    ],
    useWatchman: false,
    enableGlobalPackages: false,
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
  },
  // watchFolders,
  maxWorkers: 2,
  resetCache: true,
};
