function createReactIcon({
  id,
  viewBox,
  content,
  componentName,
  deprecated,
  replacement,
  width,
  height,
}) {
  let jsdoc = '';
  if (deprecated) {
    const replacementNotice = replacement ? `. Замените на ${replacement}` : '';

    jsdoc = `/**
 * @deprecated Иконка устарела${replacementNotice}
 */
`;
  }

  // TODO: Избавиться от default export

  // TODO: Избавиться от use-client, если избавимся от спрайта
  // Чтобы nextjs мог рендерить иконки как серверные компоненты
  return `'use-client';

import { SVGProps, Ref } from 'react';
import { makeIcon } from '@vkontakte/icons-sprite';

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
export const ${componentName} = makeIcon<${componentName}Props>(
  '${componentName}',
  '${id}',
  '${viewBox}',
  '${content}',
  ${width},
  ${height},
  ${!!deprecated},
  ${replacement ? `'${replacement}'` : undefined}
);

export default ${componentName};
`;
}

module.exports = { createReactIcon };
