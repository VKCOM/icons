const Compiler = require('svg-baker');

const compiler = new Compiler();

const reactify = (symbol) =>
`import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
import browserSprite from '../sprite';
import SvgIcon from '../SvgIcon';
import React from 'react';
import polyfill from 'es6-object-assign';

const viewBox = '${symbol.viewBox}';
const id = '${symbol.id}';
const content = '${symbol.render()}';

const browserSymbol = new BrowserSymbol({
  id: id,
  viewBox: viewBox,
  content: content
});

browserSprite.add(browserSymbol);
  
const width = ${symbol.viewBox.split(' ')[2]};
const height = ${symbol.viewBox.split(' ')[3]};

function Icon (props) {
  
  return React.createElement(SvgIcon, polyfill.assign({}, props, {
    width: width,
    height: height,
    viewBox: viewBox,
    id: id
  }));
}

export default Icon;`;

function symbol ({ content, id }) {
  return compiler.addSymbol({ content, id, path: '' }).then(symbol => reactify(symbol));
}

module.exports = symbol;
