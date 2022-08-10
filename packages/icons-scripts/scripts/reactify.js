const Compiler = require('svg-baker');

const compiler = new Compiler();

function pxToEm(pxSize, baseSize) {
  return `${Number((pxSize / baseSize).toFixed(4))}em`;
}

const reactify = (symbol, componentName) => {
  const viewBoxWidth = Number(symbol.viewBox.split(' ')[2]);
  const viewBoxHeight = Number(symbol.viewBox.split(' ')[3]);

  const fontSize = Math.max(viewBoxWidth, viewBoxHeight);
  const fontSizeWidth = pxToEm(viewBoxWidth, fontSize);
  const fontSizeHeight = pxToEm(viewBoxHeight, fontSize);

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
  ${viewBoxWidth},
  ${viewBoxHeight},
  ${fontSize},
  '${fontSizeWidth}',
  '${fontSizeHeight}',
  '${symbol.render()}'
);
`;
};

function reactifyIcon({ content, id, componentName }) {
  return compiler.addSymbol({ content, id, path: '' }).then((symbol) => reactify(symbol, componentName));
}

module.exports = { reactifyIcon };
