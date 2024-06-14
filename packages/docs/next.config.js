const withNextra = require('nextra')({
  theme: './vkui-nextra-theme',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
  transpilePackages: ['@vkontakte/vkui'],

  modularizeImports: {
    '@vkontakte/vkui': {
      transform: '@vkontakte/vkui/dist/cssm',
      skipDefaultConversion: true,
    },
  },

  output: 'export',
  images: {
    unoptimized: true,
  },
});
