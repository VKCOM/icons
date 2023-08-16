import React from 'react';
import { BrowserSymbol } from './browser-symbol';
import { addSpriteSymbol, useIsomorphicLayoutEffect } from './sprite';
import { warnOnce } from './warnOnce';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  getRootRef?: React.Ref<SVGSVGElement>;
  title?: string;
}

const SvgIcon = ({
  width = 0,
  height = 0,
  viewBox,
  id,
  className = '',
  fill,
  getRootRef,
  style: propsStyle = {},
  title,
  children,
  ...restProps
}: SvgIconProps) => {
  const size = Math.max(width, height);

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
      className={[
        'vkuiIcon',
        `vkuiIcon--${size}`,
        `vkuiIcon--w-${width}`,
        `vkuiIcon--h-${height}`,
        `vkuiIcon--${id}`,
        className,
      ]
        .join(' ')
        .trim()}
      viewBox={viewBox}
      width={width}
      height={height}
      style={style}
      ref={getRootRef}
    >
      {title && <title>{title}</title>}
      <use xlinkHref={`#${id}`} style={{ fill: 'currentColor', color: fill }}>
        {children}
      </use>
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
      addSpriteSymbol(new BrowserSymbol({ content }));
      isMounted = true;
    }
  }

  const warn = warnOnce(componentName);
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
        width={props.width !== undefined && !isNaN(props.width) ? +props.width : width}
        height={props.height !== undefined && !isNaN(props.height) ? +props.height : height}
      />
    );
  };

  (Icon as any).mountIcon = mountIcon;
  Icon.displayName = componentName;

  return Icon;
}
