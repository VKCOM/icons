const Compiler = require('svg-baker');

const compiler = new Compiler();

const reactify = (symbol, componentName) => {
  const width = symbol.viewBox.split(' ')[2];
  const height = symbol.viewBox.split(' ')[3];

  return `import React, { FC, HTMLAttributes, RefCallback, RefObject } from 'react';
// @ts-ignore
import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
// @ts-ignore
import { assign } from 'es6-object-assign';
import { addSpriteSymbol, useIsomorphicLayoutEffect } from '../sprite';
import { SvgIcon } from '../SvgIcon';

const viewBox = '${symbol.viewBox}';
const id = '${symbol.id}';
const content = '${symbol.render()}';

let isMounted = false;
function mountIcon() {
  if (!isMounted) {
    addSpriteSymbol(new BrowserSymbol({
      id: id,
      viewBox: viewBox,
      content: content,
    }));

    isMounted = true;
  }
}

export interface ${componentName}Props extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  width?: number;
  height?: number;
  getRootRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
}

const ${componentName}: FC<${componentName}Props> = (props) => {
  useIsomorphicLayoutEffect(() => {
    mountIcon();
  }, []);

  return React.createElement(SvgIcon, assign({}, props, {
    viewBox: viewBox,
    id: id,
    width: !isNaN(props.width) ? +props.width : ${width},
    height: !isNaN(props.height) ? +props.height : ${height},
  }));
};

export default ${componentName};
`;
};

function symbol({ content, id, componentName }) {
  return compiler.addSymbol({ content, id, path: '' }).then(symbol => reactify(symbol, componentName));
}

module.exports = symbol;
