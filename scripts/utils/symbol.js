const Compiler = require('svg-baker');

const compiler = new Compiler();

const reactify = (symbol, componentName) => {
  const width = symbol.viewBox.split(' ')[2];
  const height = symbol.viewBox.split(' ')[3];

  return `import { HTMLAttributes, RefCallback, RefObject } from 'react';
  import { makeIcon } from '../SvgIcon';

export interface ${componentName}Props extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  width?: number;
  height?: number;
  getRootRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
}

export default makeIcon<${componentName}Props>(
  '${componentName}',
  '${symbol.id}',
  '${symbol.viewBox}',
  '${symbol.render()}',
  ${width},
  ${height}
);
`;
};

function symbol({ content, id, componentName }) {
  return compiler.addSymbol({ content, id, path: '' }).then(symbol => reactify(symbol, componentName));
}

module.exports = symbol;
