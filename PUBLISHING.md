# Publishing

In this monorepo we have three packages to publish.
You can publish any of these packages by running associated workflow on [actions page](https://github.com/VKCOM/icons/actions).

## Packages

### @vkontakte/icons

To publish run [publish_icons](https://github.com/VKCOM/icons/actions/workflows/publish_icons.yml)
workflow.

- workflow [code](/.github/workflows/publish_icons.yml)
- package [source](/packages/icons)
- [npm](https://www.npmjs.com/package/@vkontakte/icons)

### @vkontakte/icons-scripts

To publish run [publish_scripts](https://github.com/VKCOM/icons/actions/workflows/publish_scripts.yml)
workflow.

- workflow [code](/.github/workflows/publish_scripts.yml)
- package [source](/packages/icons-scripts)
- [npm](https://www.npmjs.com/package/@vkontakte/icons-scripts)

### @vkontakte/icons-sprite

To publish run [publish_sprite](https://github.com/VKCOM/icons/actions/workflows/publish_sprite.yml)
workflow.

- workflow [code](/.github/workflows/publish_sprite.yml)
- package [source](/packages/icons-sprite)
- [npm](https://www.npmjs.com/package/@vkontakte/icons-sprite)

## F.A.Q.

### What happens when we publish a package?

1. We create a commit with message about which package has been published and with which version.
2. We also create a tag for these commit in a format `${packageName}@{version}` which you can find later on [tags](https://github.com/VKCOM/icons/tags) page.  
   For example: `@vkontakte/icons@2.43.0`.  
   We are creating a tag for every package release, not only for `@vkontakte/icons`.
3. We publish package in npm.

### What's the `g:npm:version` script in root [package.json](./package.json)?

Since `yarn >= 2`, the `version` command has been limited. For workaround we use
[`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version).

We **disable** next flags for exclude NPM side effects:

- [workspaces-update](https://docs.npmjs.com/cli/v8/commands/npm-version#workspaces-update)
- [commit-hooks](https://docs.npmjs.com/cli/v8/commands/npm-version#commit-hooks)
- [git-tag-version](https://docs.npmjs.com/cli/v8/commands/npm-version#git-tag-version)

About `cd $INIT_CWD` see [How to share scripts between workspaces?](https://yarnpkg.com/getting-started/qa#how-to-share-scripts-between-workspaces).
