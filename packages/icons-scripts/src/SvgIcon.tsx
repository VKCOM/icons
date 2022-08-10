import React from 'react';
// @ts-ignore
import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
import { IconSettingsInterface, IconSettingsContext } from './IconSettings';
import { addSpriteSymbol, useIsomorphicLayoutEffect } from './sprite';

export interface SvgIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Для пропорционального изменения размера иконки относительно размера шрифта.
   *
   * > 📝 Чтобы размер наследовался от базового размера шрифта, передайте `"inherit"` или `"1em"`.
   *
   * @default берётся `Math.max(width, height)` иконки (см. `viewBox`)
   */
  fontSize?: string | number;
  fill?: string;
  width?: number;
  height?: number;
  viewBox?: string;
  getRootRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>;
  Component?: React.ElementType,
}

interface SvgIconInternalProps extends SvgIconProps {
  defaultWidth: number;
  defaultHeight: number;
  relativeWidth: string;
  relativeHeight: string;
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

const SvgIcon: React.FC<SvgIconInternalProps> = ({
  /**
   * Внутренние параметры (скрыты от пользователя)
   */
  defaultWidth,
  defaultHeight,
  relativeWidth,
  relativeHeight,

  /**
   * Пользовательские параметры.
   */
  width: widthProp,
  height: heightProp,
  viewBox,
  id,
  className = '',
  style = {},
  fill,
  getRootRef,
  Component = 'div',
  role,
  fontSize,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  ...restProps
}) => {
  const iconSettings = React.useContext(IconSettingsContext);

  const classNameWidth = widthProp || defaultWidth;
  const classNameHeight = heightProp || defaultHeight;
  const classNameSize = Math.max(classNameWidth, classNameHeight);
  const ownClass = iconClass(['Icon', `Icon--${classNameSize}`, `Icon--w-${classNameWidth}`, `Icon--h-${classNameHeight}`, `Icon--${id}`], iconSettings);

  const width = widthProp || relativeWidth;
  const height = heightProp || relativeHeight;

  return (
    <Component
      role="presentation"
      {...restProps}
      ref={getRootRef}
      className={`${ownClass} ${className}`}
      style={{ ...style, width, height, fontSize }}
    >
      <svg
        viewBox={viewBox}
        width={width}
        height={height}
        style={svgStyle}
        role={role}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
      >
        <use xlinkHref={`#${id}`} style={{ fill: 'currentColor', color: fill }} />
      </svg>
    </Component>
  );
};

export function makeIcon<Props extends SvgIconProps = SvgIconProps>(
  componentName: string,
  id: string,
  defaultViewBox: string,
  defaultWidth: number,
  defaultHeight: number,
  relativeWidth: string,
  relativeHeight: string,
  defaultFontSize: number,
  content: string,
): React.FC<Props> {
  let isMounted = false;
  function mountIcon() {
    if (!isMounted) {
      addSpriteSymbol(new BrowserSymbol({ id, viewBox: defaultViewBox, content }));
      isMounted = true;
    }
  }

  const Icon: React.FC<Props> = ({
    viewBox = defaultViewBox,
    fontSize = defaultFontSize,
    ...restProps
  }) => {
    useIsomorphicLayoutEffect(mountIcon, []);

    return (
      <SvgIcon
        {...restProps}
        id={id}
        viewBox={viewBox}
        defaultWidth={defaultWidth}
        defaultHeight={defaultHeight}
        relativeWidth={relativeWidth}
        relativeHeight={relativeHeight}
        fontSize={fontSize}
      />
    )
  };

  (Icon as any).mountIcon = mountIcon;
  Icon.displayName = componentName;

  return Icon;
}
