const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add process polyfill
global.process = require('process');
global.process.env = global.process.env || {};
global.Buffer = require('buffer').Buffer;

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  fs: require.resolve('react-native-fs'),
  http: require.resolve('stream-http'),
  https: require.resolve('https-browserify'),
  os: require.resolve('os-browserify/browser'),
  zlib: require.resolve('browserify-zlib'),
  path: require.resolve('path-browserify'),
  crypto: require.resolve('crypto-browserify'),
  stream: require.resolve('stream-browserify'),
  _stream_duplex: require.resolve('readable-stream/lib/_stream_duplex.js'),
  _stream_passthrough: require.resolve('readable-stream/lib/_stream_passthrough.js'),
  _stream_readable: require.resolve('readable-stream/lib/_stream_readable.js'),
  _stream_writable: require.resolve('readable-stream/lib/_stream_writable.js'),
  _stream_transform: require.resolve('readable-stream/lib/_stream_transform.js'),
  util: require.resolve('util'),
  events: require.resolve('events'),
  tls: require.resolve('tls-browserify'),
  net: require.resolve('react-native-tcp-socket'),  // Key fix: Alias 'net' for tls-browserify's require('net')
  dns: require.resolve('dns.js'),  // Precautionary for any DNS resolution in chains
  assert: require.resolve('assert/'),
  process: require.resolve('process'),
  buffer: require.resolve('buffer'),  // Explicit for SDK Buffer usage
  http2: require.resolve('./mocks/http2.js'),
};

config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

// Add additional polyfills
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
