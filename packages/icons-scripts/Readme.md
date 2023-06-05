# @vkontakte/icons-scripts

Этот пакет содержит скрипты, используемые для сборки SVG-иконок в React-компоненты.

## Создание своей библиотеки иконок

Для этого необходимо организовать иконки по папкам: в каждой папке-категории должны быть только иконки. Например, здесь показаны категории иконок по размеру, а также дополнительная папка `Unsorted` с иконками, не подошедшими к другим категориями.

Обязательно должна быть папка `svg`, в которой размещены категории.

```
src/
  svg/
    12/
      add_12.svg
      smile_12.svg
    28/
      add_28.svg
      smile_28.svg
    Unsorted/
      icon_with_different_sizes.svg
```

Добавляем нужные зависимости:

```json
{
  "name": "@scope/react-icons-library",
  "version": "0.0.0",
  "files": ["dist", "src/svg"],
  "main": "dist/index.js",
  "module": "dist/es6/index.js",
  "typings": "dist/typings/index.d.ts",
  "sideEffects": ["*.css"],
  "scripts": {
    "build-icons": "node scripts/build-icons.js"
  },
  "dependencies": {
    "@vkontakte/icons-sprite": "^1.0.1"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@vkontakte/icons-scripts": "latest",
    "react": "^18.0.0"
  }
}
```

**`scripts/build-icons.js`**:

```js
const { generateIcons } = require('@vkontakte/icons-scripts');

generateIcons({
  srcDirectory: './src',
  distDirectory: './dist',
  extraCategories: ['Unsorted', 'Foo'],
  deprecatedIcons: {
    deprecated_icon_24: null,
    deprecated_icon_28: 'replacement_icon_28',
  },
});
```

## Опции скрипта

**`srcDirectory`** _`{string}`_<br>
Директория с иконками. В ней должна быть папка `svg` с категориями.

**`distDirectory`** _`{string}`_<br>
Папка для сгенерированных компонентов.

**`extraCategories`** _`{string[]}`_<br>
Дополнительные категории. По умолчанию скрипт будет искать иконки в `svg/[0-9][0-9]` и `svg/Unsorted`.

Может быть паттерном для `glob`.

**`deprecatedIcons`** _`{Record<string, string | null>>}`_<br>
Список устаревших иконок.

Объект, в котором свойство — это имя файла устаревшей иконки, а значение этого свойства — имя файла иконки на замену устаревшей (или `null`, если такой нет).

**`onIconProcess`** _`{Function}`_<br>
Будет вызвана с каждым объектом иконки в процессе обработки.

**`noEmit`** _`{boolean}`_<br>
Пропустит запись результатов в файл. Полезно, если вы обрабатываете иконки самостоятельно через `onIconProcess`.
