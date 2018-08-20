module.exports = function (source) {
  return `
    ${source.replace('export default symbol', '')}
    import React from 'react';
    
    const width = symbol.viewBox.split(' ')[2];
    const height = symbol.viewBox.split(' ')[3];
    const size = Math.max(width, height); 
    
    function SvgIcon ({ className, fill, style, getRootRef, ...restProps }) {
      return (
        <div 
          {...restProps} 
          ref={getRootRef}
          className={'Icon' + ' Icon--' + size + ' Icon--' + symbol.id + ' ' + (className || '')}
          style={{ ...style, width: width + 'px', height: height + 'px' }} 
        >
          <svg viewBox={symbol.viewBox} width={width} height={height} style={{ display: 'block' }}>
            <use xlinkHref={'#' + symbol.id} style={{ fill: 'currentColor', color: fill }} />
          </svg>
        </div>
      );
    }
    export default SvgIcon;
  `;
};
