import React from 'react';
import { BrowserSymbol } from './browser-symbol';
import { addSpriteSymbol, useIsomorphicLayoutEffect } from './sprite';
import { warnOnce } from './warnOnce';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  getRootRef?: React.Ref<SVGSVGElement>;
  title?: string;
  /**
   * @ignore
   */
  iconId?: string;
}

const SvgIcon = ({
  width = 0,
  height = 0,
  display = 'block',
  'aria-hidden': ariaHidden = true,
  iconId,
  className,
  fill,
  getRootRef,
  'style': propsStyle,
  title,
  children,
  ...restProps
}: SvgIconProps) => {
  const child = React.Children.toArray(children)[0];
  const hasIconChildren =
    React.isValidElement(child) && typeof child.type === 'function' && 'mountIcon' in child.type;

  const size = Math.max(width, height);

  const style = {
    width,
    height,
    ...propsStyle,
  };

  return (
    <svg
      aria-hidden={ariaHidden}
      display={display}
      className={[
        'vkuiIcon',
        `vkuiIcon--${size}`,
        `vkuiIcon--w-${width}`,
        `vkuiIcon--h-${height}`,
        `vkuiIcon--${iconId}`,
        className,
      ]
        .join(' ')
        .trim()}
      width={width}
      height={height}
      style={style}
      ref={getRootRef}
      {...restProps}
    >
      {title && <title>{title}</title>}
      {hasIconChildren && children}
      <use xlinkHref={`#${iconId}`} style={{ fill: 'currentColor', color: fill }}>
        {!hasIconChildren && children}
      </use>
    </svg>
  );
};

export function makeIcon<Props extends SvgIconProps = SvgIconProps, Subcomponents = {}>(
  componentName: string,
  iconId: string,
  viewBox: string,
  content: string,
  width: number,
  height: number,
  deprecated?: boolean,
  replacement?: string,
  attrs?: Record<string, string>,
): React.FC<Props> & Subcomponents {
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
        {...attrs}
        viewBox={viewBox}
        iconId={iconId}
        {...props}
        width={props.width !== undefined && !isNaN(props.width) ? +props.width : width}
        height={props.height !== undefined && !isNaN(props.height) ? +props.height : height}
      />
    );
  };

  Icon.mountIcon = mountIcon;
  Icon.displayName = componentName;

  return Icon as any;
}
