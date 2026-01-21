import * as path from 'node:path';

const appearanceTypes = ['light', 'dark'];

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
export function createReactRasterIcon({ id, size, componentName, ...options }, outputPath) {
  /**
   * @type {Record<'densityBucketSetImports' | 'densityBucketAvailableImports', string[]>}
   */
  const { densityBucketSetImports, densityBucketAvailableImports } = densityBucketTypes.reduce(
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

  return `import { ImgHTMLAttributes, Ref, FC } from 'react';
import { makeRasterIcon } from '@vkontakte/icons-sprite';
${densityBucketSetImports.join('\n')}

export interface ${componentName}Props extends ImgHTMLAttributes<HTMLImageElement> {
  getRootRef?: Ref<HTMLImageElement>;
}

export const ${componentName}: FC<${componentName}Props> = makeRasterIcon<${componentName}Props>(
  '${componentName}',
  '${id}',
  ${size},
  {${densityBucketAvailableImports}}
);
`;
}
