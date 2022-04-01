const webpack = require('webpack')
module.exports = function override(config) {
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
  config.ignoreWarnings = [/Failed to parse source map/];
  config.plugins = (config.plugins || []).concat([ 
    new webpack.ProvidePlugin({ 
     process: 'process/browser', 
     Buffer: ['buffer', 'Buffer'] 
   }) 
  ]) 
  return config;
}
