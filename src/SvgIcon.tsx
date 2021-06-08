import React, { ElementType, FC, HTMLAttributes, RefCallback, RefObject, useContext } from 'react';
import { IconSettingsInterface, IconSettingsContext } from './IconSettings';

interface SvgIconProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  getRootRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
  Component?: ElementType,
}

const svgStyle = { display: 'block' };

function iconClass(fragments: string[], { classPrefix, globalClasses }: IconSettingsInterface) {
  let res = '';
  for (let i = 0; i < fragments.length; i++) {
    if (classPrefix) {
      res += ' ' + (classPrefix + fragments[i]);
    }
    if (!classPrefix || globalClasses) {
      res += ' ' + fragments[i];
    }
  }
  return res;
}

export const SvgIcon: FC<SvgIconProps> = ({ width, height, viewBox, id, className, style, fill, getRootRef, Component, ...restProps }) => {
  const size = Math.max(width, height);

  const iconSettings = useContext(IconSettingsContext);
  const ownClass = iconClass(['Icon', `Icon--${size}`, `Icon--w-${width}`, `Icon--h-${height}`, `Icon--${id}`], iconSettings);

  return (
    <Component
      role="presentation"
      {...restProps}
      ref={getRootRef}
      className={`${ownClass} ${className}`}
      style={{ ...style, width, height }}
    >
      <svg viewBox={viewBox} width={width} height={height} style={svgStyle}>
        <use xlinkHref={`#${id}`} style={{ fill: 'currentColor', color: fill }} />
      </svg>
    </Component>
  );
};

SvgIcon.defaultProps = {
  Component: 'div',
  className: '',
  style: {},
};
