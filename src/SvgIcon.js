import React from 'react';

const svgStyle = { display: 'block' };

function SvgIcon ({ width, height, viewBox, id, className, style, fill, getRootRef, ...restProps }) {
  const size = Math.max(width, height);

  return (
    <div
      {...restProps}
      ref={getRootRef}
      className={`Icon Icon--${size} Icon--w-${width} Icon--h-${height} Icon--${id} ${className}`}
      style={{ ...style, width, height }}
    >
      <svg viewBox={viewBox} width={width} height={height} style={svgStyle}>
        <use xlinkHref={`#${id}`} style={{ fill: 'currentColor', color: fill }} />
      </svg>
    </div>
  );
}

SvgIcon.defaultProps = {
  className: '',
  style: {}
};

export default SvgIcon;
