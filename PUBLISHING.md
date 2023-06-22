# Публикация пакетов в NPM

В этом монорепозитории у нас есть три пакета которые можно опубликовать.
Для этого нужно перейти на страницу [Actions](https://github.com/VKCOM/icons/actions) и запустить
соответствующий workflow.

## Пакеты

### @vkontakte/icons

Для публикации надо запустить [publish_icons](https://github.com/VKCOM/icons/actions/workflows/publish_icons.yml) workflow.

- [код workflow](/.github/workflows/publish_icons.yml)
- [код пакета в репозитории](/packages/icons)
- [npm](https://www.npmjs.com/package/@vkontakte/icons)

### @vkontakte/icons-scripts

Для публикации надо запустить [publish_scripts](https://github.com/VKCOM/icons/actions/workflows/publish_scripts.yml) workflow.

- [код workflow](/.github/workflows/publish_scripts.yml)
- [код пакета в репозитории](/packages/icons-scripts)
- [npm](https://www.npmjs.com/package/@vkontakte/icons-scripts)

### @vkontakte/icons-sprite

Для публикации надо запустить [publish_sprite](https://github.com/VKCOM/icons/actions/workflows/publish_sprite.yml) workflow.

- [код workflow](/.github/workflows/publish_sprite.yml)
- [код пакета в репозитории](/packages/icons-sprite)
- [npm](https://www.npmjs.com/package/@vkontakte/icons-sprite)

## F.A.Q.

### Что происходит во время публикации пакета?

1. Мы поднимаем версию пакета в package.json и создаём коммит в репозитории https://github.com/VKCOM/icons с сообщением о том, какой пакет публикуем как изменилась его версия.
2. Создаем тэг на этом коммите в формате `${packageName}@{version}`, который потом можно найти на [странице с тэгами](https://github.com/VKCOM/icons/tags)  
   Например: `@vkontakte/icons@2.43.0`.  
   Мы создаем тэг при публикации каждого пакета, не только `@vkontakte/icons`.
3. Публикуем пакет в NPM.

### Зачем нужен скрипт `g:npm:version` в главном [package.json](./package.json) репозитория?

Начиная с `yarn >= 2` команда `yarn version` стала урезанной, и перестала принивать параметр `--preid`, который нам нужен для публикации
`alpha` и `beta` версий.
В качестве решения мы используем [`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version) вместо `yarn version`.

Мы специально отключили следующие флаги, чтобы `npm version` работал корректно и косвенно не влиял нашу конфигукцию `yarn workspaces`:

- [workspaces-update](https://docs.npmjs.com/cli/v8/commands/npm-version#workspaces-update)
- [commit-hooks](https://docs.npmjs.com/cli/v8/commands/npm-version#commit-hooks)
- [git-tag-version](https://docs.npmjs.com/cli/v8/commands/npm-version#git-tag-version)

По поводу использования `cd $INIT_CWD` можно почитать здесь: [How to share scripts between workspaces?](https://yarnpkg.com/getting-started/qa#how-to-share-scripts-between-workspaces).
