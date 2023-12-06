const densityBucketTypes = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];

function createReactIcon({ id, size, componentName, ...options }) {
  let { densityBucketSetImports, densityBucketAvailableTypes } = densityBucketTypes.reduce(
    (data, densityBucketType) => {
      const path = options[densityBucketType];

      if (!path) {
        return data;
      }

      data.densityBucketSetImports.push(`import ${densityBucketType} from '${path}';`);
      data.densityBucketAvailableTypes.push(densityBucketType);

      return data;
    },
    {
      densityBucketSetImports: [],
      densityBucketAvailableTypes: [],
    },
  );

  densityBucketSetImports = densityBucketSetImports.join('\n');

  return `import { ImgHTMLAttributes, Ref } from 'react';
import { makeRasterIcon } from '@vkontakte/icons-sprite';

${densityBucketSetImports}

export interface ${componentName}Props extends ImgHTMLAttributes<HTMLImageElement> {
  getRootRef?: Ref<HTMLImageElement>;
}

export const ${componentName} = makeRasterIcon<${componentName}Props>(
  '${componentName}',
  '${id}',
  ${size},
  ${densityBucketAvailableTypes}
);
`;
}

module.exports = { createReactIcon };
