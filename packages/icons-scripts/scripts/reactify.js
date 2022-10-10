const Compiler = require('svg-baker');

const compiler = new Compiler();

const reactify = (symbol, componentName, deprecated, replacement) => {
  const width = symbol.viewBox.split(' ')[2];
  const height = symbol.viewBox.split(' ')[3];

  return `import { HTMLAttributes, RefCallback, RefObject } from 'react';
import { makeIcon } from '../SvgIcon';

export interface ${componentName}Props extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  width?: number;
  height?: number;
  getRootRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
  deprecated?: boolean;
  replacement?: string;
}

export default makeIcon<${componentName}Props>(
  '${componentName}',
  '${symbol.id}',
  '${symbol.viewBox}',
  '${symbol.render()}',
  ${width},
  ${height},
  ${!!deprecated},
  ${replacement ? `'${replacement}'` : undefined}
);
`;
};

function reactifyIcon({ content, id, componentName, deprecated, replacement }) {
  return compiler.addSymbol({ content, id, path: '' }).then((symbol) => reactify(symbol, componentName, deprecated, replacement));
}

module.exports = { reactifyIcon };
