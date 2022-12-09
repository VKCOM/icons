import React from 'react';
// @ts-ignore
import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
import { IconSettingsInterface, IconSettingsContext } from './IconSettings';
import { addSpriteSymbol, useIsomorphicLayoutEffect } from './sprite';
import { warnOnce } from './warnOnce';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  getRootRef?: React.Ref<SVGSVGElement>;
  title?: string;
}

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

const SvgIcon = ({
  width,
  height,
  viewBox,
  id,
  className = '',
  fill,
  getRootRef,
  style: propsStyle = {},
  title,
  ...restProps
}: SvgIconProps) => {
  const size = Math.max(width, height);

  const iconSettings = React.useContext(IconSettingsContext);
  const ownClass = iconClass(
    ['Icon', `Icon--${size}`, `Icon--w-${width}`, `Icon--h-${height}`, `Icon--${id}`],
    iconSettings,
  );

  const style = {
    width,
    height,
    ...propsStyle,
  };

  return (
    <svg
      aria-hidden="true"
      display="block"
      {...restProps}
      className={`${ownClass} ${className}`}
      viewBox={viewBox}
      width={width}
      height={height}
      style={style}
      ref={getRootRef}
    >
      {title && <title>{title}</title>}
      <use xlinkHref={`#${id}`} style={{ fill: 'currentColor', color: fill }} />
    </svg>
  );
};

export function makeIcon<Props extends SvgIconProps = SvgIconProps>(
  componentName: string,
  id: string,
  viewBox: string,
  content: string,
  width: number,
  height: number,
  deprecated?: boolean,
  replacement?: string,
): React.FC<Props> {
  let isMounted = false;
  function mountIcon() {
    if (!isMounted) {
      addSpriteSymbol(new BrowserSymbol({ id, viewBox, content }));
      isMounted = true;
    }
  }

  const warn = deprecated ? warnOnce(componentName) : null;
  const Icon = (props: Props) => {
    useIsomorphicLayoutEffect(mountIcon, []);

    if (deprecated) {
      const replacementNotice = replacement ? `. Замените на ${replacement}` : '';

      warn('Иконка устарела' + replacementNotice);
    }

    return (
      <SvgIcon
        {...props}
        viewBox={viewBox}
        id={id}
        width={!isNaN(props.width) ? +props.width : width}
        height={!isNaN(props.height) ? +props.height : height}
      />
    );
  };

  (Icon as any).mountIcon = mountIcon;
  Icon.displayName = componentName;

  return Icon;
}
