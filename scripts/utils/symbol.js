const Compiler = require('svg-baker');

const compiler = new Compiler();

const reactify = (symbol) => {
  const width = symbol.viewBox.split(' ')[2];
  const height = symbol.viewBox.split(' ')[3];

  return `import React from 'react';
import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
import { assign } from 'es6-object-assign';
import browserSprite from '../sprite';
import SvgIcon from '../SvgIcon';

const viewBox = '${symbol.viewBox}';
const id = '${symbol.id}';
const content = '${symbol.render()}';

if (browserSprite) {
  const browserSymbol = new BrowserSymbol({
    id: id,
    viewBox: viewBox,
    content: content
  });

  browserSprite.add(browserSymbol);
}

function Icon (props) {
  return React.createElement(SvgIcon, assign({}, props, {
    viewBox: viewBox,
    id: id,
    width: !isNaN(props.width) ? +props.width : ${width},
    height: !isNaN(props.height) ? +props.height : ${height}
  }));
}

export default Icon;`;
};

function symbol ({ content, id }) {
  return compiler.addSymbol({ content, id, path: '' }).then(symbol => reactify(symbol));
}

module.exports = symbol;
