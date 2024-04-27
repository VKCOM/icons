const { dashToCamel } = require('../utils');

function createReactIcon({
  id,
  width,
  height,
  viewBox,
  content,
  componentName,
  deprecated,
  replacement,
  subcomponents,
}) {
  const subcomponentsImports = getSubcomponentsImports(subcomponents);
  const { assigns, typeAssigns } = getSubcomponentsAssigns(componentName, subcomponents);

  let jsdoc = '';
  if (deprecated) {
    const replacementNotice = replacement ? `. Замените на ${replacement}` : '';

    jsdoc = `/**
 * @deprecated Иконка устарела${replacementNotice}
 */
`;
  }

  // TODO: Избавиться от use client, если избавимся от спрайта
  // Чтобы nextjs мог рендерить иконки как серверные компоненты
  return `'use client';

import { SVGProps, Ref } from 'react';
import { makeIcon } from '@vkontakte/icons-sprite';
${subcomponentsImports}

export interface ${componentName}Props extends SVGProps<SVGSVGElement> {
  fill?: string;
  width?: number;
  height?: number;
  getRootRef?: Ref<SVGSVGElement>;
  title?: string;
  deprecated?: boolean;
  replacement?: string;
}

${jsdoc}
export const ${componentName} = makeIcon<${componentName}Props, ${typeAssigns}>(
  '${componentName}',
  '${id}',
  '${viewBox}',
  '${content}',
  ${width},
  ${height},
  ${!!deprecated},
  ${replacement ? `'${replacement}'` : undefined}
);
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

module.exports = { createReactIcon };
