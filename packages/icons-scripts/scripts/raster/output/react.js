const path = require('path');
const { appearanceTypes } = require('@vkontakte/icons-sprite');

/**
 * @type {DensityBucketType[]}
 */
const densityBucketTypes = ['mdpi', 'xhdpi', 'xxhdpi'];

/**
 *
 * @param {IconEntity} icon
 * @param {string} outputPath
 * @returns {string}
 */
function createReactRasterIcon({ id, size, componentName, ...options }, outputPath) {
  /**
   * @type {Record<'densityBucketSetImports' | 'densityBucketAvailableImports', string[]>}
   */
  let { densityBucketSetImports, densityBucketAvailableImports } = densityBucketTypes.reduce(
    (data, densityBucketType) => {
      for (const appearance of appearanceTypes) {
        const densityPath = options[appearance]?.[densityBucketType];

        if (!densityPath) {
          return data;
        }

        const importPath = path.relative(outputPath, densityPath);

        const importName = `${appearance}${densityBucketType}`;

        data.densityBucketSetImports.push(`import ${importName} from '${importPath}';`);
        data.densityBucketAvailableImports.push(importName);
      }

      return data;
    },
    {
      densityBucketSetImports: [],
      densityBucketAvailableImports: [],
    },
  );

  return `import { ImgHTMLAttributes, Ref } from 'react';
import { makeRasterIcon } from '@vkontakte/icons-sprite';
${densityBucketSetImports.join('\n')}

export interface ${componentName}Props extends ImgHTMLAttributes<HTMLImageElement> {
  getRootRef?: Ref<HTMLImageElement>;
}

export const ${componentName} = makeRasterIcon<${componentName}Props>(
  '${componentName}',
  '${id}',
  ${size},
  {${densityBucketAvailableImports}}
);
`;
}

module.exports = {
  createReactRasterIcon,
};
