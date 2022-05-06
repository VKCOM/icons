import React from 'react';
// @ts-ignore
import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
import { IconSettingsInterface, IconSettingsContext } from './IconSettings';
import { addSpriteSymbol, useIsomorphicLayoutEffect } from './sprite';

export interface SvgIconProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  getRootRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>;
  Component?: React.ElementType,
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

const SvgIcon: React.FC<SvgIconProps> = ({
  width,
  height,
  viewBox,
  id,
  className = '',
  style = {},
  fill,
  getRootRef,
  Component = 'div',
  ...restProps
}) => {
  const size = Math.max(width, height);

  const iconSettings = React.useContext(IconSettingsContext);
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

export function makeIcon<Props extends SvgIconProps = SvgIconProps>(
  componentName: string,
  id: string,
  viewBox: string,
  content: string,
  width: number,
  height: number
): React.FC<Props> {
  let isMounted = false;
  function mountIcon() {
    if (!isMounted) {
      addSpriteSymbol(new BrowserSymbol({ id, viewBox, content }));
      isMounted = true;
    }
  }

  const Icon: React.FC<Props> = (props) => {
    useIsomorphicLayoutEffect(mountIcon, []);

    return (
      <SvgIcon
        {...props}
        viewBox={viewBox}
        id={id}
        width={!isNaN(props.width) ? +props.width : width}
        height={!isNaN(props.height) ? +props.height : height}
      />
    )
  };

  (Icon as any).mountIcon = mountIcon;
  Icon.displayName = componentName;

  return Icon;
}
