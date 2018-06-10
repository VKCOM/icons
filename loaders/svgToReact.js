module.exports = function (source) {
  return `
    ${source.replace('export default symbol', '')}
    var React = require('react');
    
    var width = symbol.viewBox.split(' ')[2];
    var height = symbol.viewBox.split(' ')[3];
    var size = Math.max(width, height); 
    
    function SvgIcon (props) {
      var className = 'Icon' + ' Icon--' + size + ' Icon--' + symbol.id + ' ' + (props.className || '');
      
      return (
        React.createElement('div', {
          className: className,
          style: { width: width + 'px', height: height + 'px' },
          onClick: props.onClick
        }, React.createElement('svg', {
          viewBox: symbol.viewBox,
          width: width,
          height: height,
          style: { display: 'block' }
        }, React.createElement('use', {
          xlinkHref: '#' + symbol.id,
          style: { fill: 'currentColor', color: props.fill }
        })))
      );
    }
    module.exports = SvgIcon;
  `;
};

