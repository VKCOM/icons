import { dashToCamel } from '../utils.js';

export function createReactIcon({
  id,
  attrs,
  width,
  height,
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

  return `
import * as React from 'react';
import { SvgIconRoot, type SvgIconProps } from '@vkontakte/icons-sprite';
${subcomponentsImports}

export type ${componentName}Props = SvgIconProps

${jsdoc}
export const ${componentName}: React.FC<${componentName}Props> & ${typeAssigns} = ({
  width = ${width},
  height = ${height},
  children,
  style,
  fill,
  ...restProps
}: ${componentName}Props) => {
  return (
    <SvgIconRoot
      baseClassName="vkuiIcon--${id}"
      width={width}
      height={height}
      style={fill ? { color: fill, ...style } : style}
      ${attrs ? `{...${JSON.stringify(attrs)}}` : ''}
      {...restProps}
    >
      {children}
      ${content}
    </SvgIconRoot>
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
