import fs from 'node:fs';
import path from 'node:path';
import { createIconsMap } from './icons-map.js';
import { createReactRasterIcon } from './output/react.js';

/**
 * @param {string} srcDirectory
 * @param {string} tsFilesDirectory
 */
export function generateRasterIcons(srcDirectory, tsFilesDirectory) {
  const iconsMap = createIconsMap(srcDirectory);

  const exportsMap = {};

  iconsMap.forEach((icon) => {
    const { id, size, dirname, componentName: exportName } = icon;

    const iconDir = path.join(tsFilesDirectory, dirname);
    const reactSource = createReactRasterIcon(icon, iconDir);

    if (!fs.existsSync(iconDir)) {
      fs.mkdirSync(iconDir, { recursive: true });
    }

    const fileName = `${id}${size ? `_${size}` : ''}`;
    fs.writeFileSync(path.join(iconDir, `${fileName}.ts`), reactSource);

    exportsMap[exportName] = `./${dirname}/${fileName}`;
  });

  if (iconsMap.size) {
    fs.copyFileSync(
      path.resolve(import.meta.dirname, './output/declaration.d.ts'),
      path.join(tsFilesDirectory, 'declaration.d.ts'),
      fs.constants.COPYFILE_EXCL,
    );
  }

  return exportsMap;
}
