# Компоненты для документации

В данном пакете содержатся компоненты для документации

```sh
yarn add @vkontakte/vkui-nextra-theme
```

## Nextra

### Настройка Next.js

В конфигурации Next.js требуется подключить nextra и настроить транспиляцию
пакетов

**next.config.js**

```js
const withNextra = require('nextra')({
  theme: './theme.tsx',
});

module.exports = withNextra({
  transpilePackages: ['@vkontakte/vkui', '@vkontakte/vkui-nextra-theme'],

  modularizeImports: {
    '@vkontakte/vkui': {
      transform: '@vkontakte/vkui/dist/cssm',
      skipDefaultConversion: true,
    },
  },
});
```

### Настройка темы

**theme.tsx**

```tsx

```

### Подключение глобальных стилей

**pages/\_app.tsx**

```tsx
import '@vkontakte/vkui-nextra-theme/styles.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```
