module.exports = function override(config, env) {
  config.resolve.fallback = {
    fs: false,
    tls: false,
    net: false,
    https: false,
    http: false,
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify')
  };
  return config;
}
