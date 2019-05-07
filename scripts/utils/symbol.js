const Compiler = require('svg-baker');

const compiler = new Compiler();

const reactify = (symbol) =>
`import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
import browserSprite from '../sprite';
import SvgIcon from '../SvgIcon';
import React from 'react';
import { assign } from 'es6-object-assign';

const browserSymbol = new BrowserSymbol({
  id: '${symbol.id}',
  viewBox: '${symbol.viewBox}',
  content: '${symbol.render()}'
});

browserSprite.add(browserSymbol);

function Icon (props) {
  return React.createElement(SvgIcon, assign({
    id: '${symbol.id}',
    viewBox: '${symbol.viewBox}',
    width: ${symbol.viewBox.split(' ')[2]},
    height: ${symbol.viewBox.split(' ')[3]}
  }, props));
}

export default Icon;`;

function symbol ({ content, id }) {
  return compiler.addSymbol({ content, id, path: '' }).then(reactify);
}

module.exports = symbol;
