const fs = require('fs');
const path = require('path');
const { createIconsMap } = require('./icons-map');
const { createReactIcon } = require('./output/react');

/**
 *
 * @param {string[]} icons
 * @param {string} srcDirectory
 * @param {string} tsFilesDirectory
 */
function generateRasterIcons(icons, srcDirectory, tsFilesDirectory) {
  if (!icons?.length) {
    return;
  }

  const iconsMap = createIconsMap(icons, srcDirectory);

  const exportsMap = {};

  iconsMap.forEach((icon) => {
    const { id, size, dirname, componentName: exportName } = icon;

    const reactSource = createReactIcon(icon);

    const iconDir = path.join(tsFilesDirectory, dirname);

    if (!fs.existsSync(iconDir)) {
      fs.mkdirSync(iconDir, { recursive: true });
    }

    const fileName = `${id}${size ? `_${size}` : ''}`;
    fs.writeFileSync(path.join(iconDir, `${fileName}.ts`), reactSource);

    exportsMap[exportName] = `./${dirname}/${fileName}`;
  });

  return exportsMap;
}

module.exports = {
  generateRasterIcons,
};
