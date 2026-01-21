import * as React from 'react';
import { type SvgIconProps } from './SvgIconRoot';

interface SvgIconRootV2Props extends SvgIconProps {
  vkuiIconId: string;
  vkuiProps: SvgIconProps;
  vkuiAttrs?: SvgIconProps;
  children?: React.ReactElement;
}

export function SvgIconRootV2({
  vkuiIconId,
  vkuiAttrs,
  vkuiProps,
  children: vkuiChildren,
  ...iconProps
}: SvgIconRootV2Props) {
  const {
    width = 0,
    height = 0,
    display = 'block',
    'aria-hidden': ariaHidden = true,
    className,
    getRootRef,
    style,
    title,
    children,
    ...restProps
  } = {
    ...iconProps,
    ...vkuiProps,
  };

  const size = Math.max(width, height);

  return (
    <svg
      className={
        (className ? className + ' ' : '') +
        `vkuiIcon vkuiIcon--${size} vkuiIcon--w-${width} vkuiIcon--h-${height} vkuiIcon--${vkuiIconId}`
      }
      aria-hidden={ariaHidden}
      display={display}
      width={width}
      height={height}
      ref={getRootRef}
      style={{
        width,
        height,
        color: restProps.fill,
        ...style,
      }}
      {...restProps}
      {...vkuiAttrs}
    >
      {title && <title>{title}</title>}
      {children}
      {vkuiChildren}
    </svg>
  );
}
