import React, { FC, HTMLAttributes, RefCallback, RefObject } from 'react';

interface SvgIconProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  getRootRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
}

const svgStyle = { display: 'block' };

export const SvgIcon: FC<SvgIconProps> = ({ width, height, viewBox, id, className, style, fill, getRootRef, ...restProps }) => {
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
};

SvgIcon.defaultProps = {
  className: '',
  style: {},
};
