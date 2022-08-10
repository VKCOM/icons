const Compiler = require('svg-baker');

const compiler = new Compiler();

function pxToEm(pxSize, baseSize) {
  return `${Number((pxSize / baseSize).toFixed(4))}em`;
}

const reactify = (symbol, componentName) => {
  const defaultWidth = Number(symbol.viewBox.split(' ')[2]);
  const defaultHeight = Number(symbol.viewBox.split(' ')[3]);

  const baseSize = Math.max(defaultWidth, defaultHeight);
  const relativeWidth = pxToEm(defaultWidth, baseSize);
  const relativeHeight = pxToEm(defaultHeight, baseSize);

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
  ${defaultWidth},
  ${defaultHeight},
  '${relativeWidth}',
  '${relativeHeight}',
  ${baseSize},
  '${symbol.render()}'
);
`;
};

function reactifyIcon({ content, id, componentName }) {
  return compiler.addSymbol({ content, id, path: '' }).then((symbol) => reactify(symbol, componentName));
}

module.exports = { reactifyIcon };
