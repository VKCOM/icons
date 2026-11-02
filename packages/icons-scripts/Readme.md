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
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "typings": "dist/typings/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/typings/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build-icons": "node scripts/build-icons.js"
  },
  "dependencies": {
    "@vkontakte/icons-sprite": "^3.0.0",
    "@swc/helpers": "^0.5.15"
  },
  "peerDependencies": {
    "react": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@vkontakte/icons-scripts": "latest",
    "react": "^19.0.0"
  }
}
```

**`scripts/build-icons.js`**:

```js
import { generateIcons } from '@vkontakte/icons-scripts';

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

## Создание сабкомпонентов для иконок

Может возникнуть потребность в покраске разных частей иконок разными цветами,
для решения этой задачи из коробки доступна возможность создания неограниченного количества
подкомпонентов для базовой иконки, но нужно чтобы каждая часть иконки имела `part` суффикс в названии своего файла.

Например, необходима иконка видеокамеры синего цвета с перечеркнутой красной линией,
при этом цвета могут меняться динамически и не зашиваются в сам svg файл:

1. Нарезаем иконку на нужные части:

   <img width="221" height="341" src="https://github.com/VKCOM/icons/assets/42776347/88e15d2b-75db-4f18-9b1d-fd8abb147ada" />

2. Придумываем название для базовой иконки, в нашем случае `videocam`,
   так как эта иконка собирается по частям, нужно добавить `part` суффикс в ее название: `videocam_part`,
   и добавляем сам размер иконки: `videocam_part_28.svg`.

3. Придумываем название для части от базовой иконки, базовая иконка называется `videocam`,
   часть с линией иконки мы назвали `slash`: `videocam_slash`.
   так как эта иконка собирается по частям, нужно добавить `part` суффикс в ее название: `videocam_slash_part`,
   и добавляем сам размер иконки в название файла в конце: `videocam_slash_part_28.svg`.

4. Кладём получившиеся файлы в папку с нужной категорией, как описано в шаге про создание своей библиотеки.

После этого иконку можно собирать по частям в коде:

```tsx
<Icon28VideocamPart>
  <Icon28VideocamPart.SlashPart />
</Icon28VideocamPart>;
```

Сам компонент иконки и все его сабкомпоненты имеют одинаковый набор принимаемых параметров, поэтому каждую отдельную часть можно покрасить например через `fill`.

## Создание своей библиотеки растровых иконок

Может появиться потребность в создании растровых иконок, например, некоторые браузеры некорректно обрабатывают векторные тени и градиенты,
либо размер файлов с такими эффектами намного больше растрового формата. Скрипты из пакета могут одновременно генерировать компоненты
как для векторного формата, так и для растрового - png.

Добавьте папку `png`, в которой размещены категории с размерами.
У каждого размера должны быть категории, в которых располагаются изображения под разные плотности пикселей экранов.

Например, иконка 24 размера может отобразиться на retina-экране, для таких экранов используется изображение повышенного разрешения.
Для категорий разрешений мы используем именования из [🔗 Android](https://developer.android.com/training/multiscreen/screendensities#TaskProvideAltBmp),
названия файлов разных разрешений для одной и той же иконки должны иметь одинаковое название, но разное разрешение:

<img alt="image" height="150" src="https://github.com/VKCOM/icons/assets/42776347/a006657e-18fb-4248-a6f3-b866e3f33601" width="400"/>

```
src/
  png/
    12/
      drawable-mdpi/
        lock_shadow_12.png // 1x, 12px/12px
      drawable-hdpi/
        lock_shadow_12.png // 1.5x 18px/18px
      drawable-xhdpi/
        lock_shadow_12.png // 2x, 24px/24px
      drawable-xxhdpi/
        lock_shadow_12.png // 3x, 36px/36px
      drawable-xxxhdpi/
        lock_shadow_12.png // 4x, 48px/48px
    28/
      drawable-mdpi/
        verified_dark_28.png // 1x, 28px/28px
      drawable-hdpi/
        verified_dark_28.png // 1.5x 42px/42px
      drawable-xhdpi/
        verified_dark_28.png // 2x, 56px/56px
      drawable-xxhdpi/
        verified_dark_28.png // 3x, 84px/84px
      drawable-xxxhdpi/
        verified_dark_28.png // 4x, 112px/112px
```
