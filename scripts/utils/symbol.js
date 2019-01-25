const Compiler = require('svg-baker');

const compiler = new Compiler();

const reactify = (symbol) =>
`import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
import browserSprite from '../sprite';
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
const size = Math.max(width, height);
const style = { display: 'block' };

function SvgIcon (props) {
  
  return (
    React.createElement('div', polyfill.assign({}, props, {
      ref: props.getRootRef,
      className: 'Icon' + ' Icon--' + size + ' Icon--' + id + ' ' + props.className,
      style: polyfill.assign({}, props.style, {
        width: width + 'px', height: height + 'px'
      })
    }), React.createElement('svg', {
      viewBox: viewBox,
      width: width,
      height: height,
      style: style
    }, React.createElement('use', {
      xlinkHref: '#' + id,
      style: { fill: 'currentColor', color: props.fill }
    })))
  )
}

SvgIcon.defaultProps = {
  className: '',
  style: {}
};

export default SvgIcon;`;

function symbol ({ content, id }) {
  return compiler.addSymbol({ content, id, path: '' }).then(symbol => reactify(symbol));
}

module.exports = symbol;
