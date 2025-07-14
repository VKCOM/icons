import { dashToCamel } from '../utils.js';

export function createReactIcon({
  id,
  attrs,
  width,
  height,
  viewBox = `0 0 ${width} ${height}`,
  content,
  componentName,
  deprecated,
  replacement,
  subcomponents,
}) {
  const subcomponentsImports = getSubcomponentsImports(subcomponents);
  const { assigns, typeAssigns } = getSubcomponentsAssigns(componentName, subcomponents);

  const needReactId = content.includes('${reactId}');

  let jsdoc = '';
  if (deprecated) {
    const replacementNotice = replacement ? `. Замените на ${replacement}` : '';

    jsdoc = `/**
 * @deprecated Иконка устарела${replacementNotice}
 */
`;
  }

  return `
${needReactId ? `'use client';` : ''}

import * as React from 'react';
import { SvgIconRootV2, type SvgIconProps } from '@vkontakte/icons-sprite';
${subcomponentsImports}

export type ${componentName}Props = SvgIconProps

${jsdoc}
export const ${componentName}: React.FC<${componentName}Props> & ${typeAssigns} = (props: ${componentName}Props) => {
  ${needReactId ? 'const reactId = React.useId()' : ''}

  return (
    <SvgIconRootV2
      viewBox="${viewBox}"
      width={${width}}
      height={${height}}
      vkuiIconId="${id}"
      ${attrs ? `vkuiAttrs={${JSON.stringify(attrs)}}` : ''}
      vkuiProps={props}
    >
      ${content}
    </SvgIconRootV2>
  );
}

${assigns}
`;
}

function getSubcomponentsImports(subcomponents) {
  return (
    subcomponents
      ?.map(({ componentName, filename }) => `import { ${componentName} } from './${filename}';`)
      .join('\n') ?? ''
  );
}

function getSubcomponentsAssigns(rootComponentName, subcomponents) {
  let typeAssigns = [];

  const assigns =
    subcomponents
      ?.map(({ id, prefix, componentName }) => {
        const subcomponentName = dashToCamel(id.replace(prefix, ''));

        typeAssigns.push(`${subcomponentName}: typeof ${componentName}`);

        return `${rootComponentName}.${subcomponentName} = ${componentName};`;
      })
      .join('\n') ?? '';

  return {
    assigns,
    typeAssigns: assigns ? `{ ${typeAssigns.join(',\n')} }` : '{}',
  };
}
