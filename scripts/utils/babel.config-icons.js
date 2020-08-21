const pkg = require('../../package');

module.exports = function (api) {
  if (api) {
    api.cache(true);
  }
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: pkg.browserslist,
          },
        },
      ], '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
