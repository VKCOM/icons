import type * as React from 'react';

function classNames(...classes: (string | undefined)[]) {
  return classes.filter((v) => v).join(' ');
}

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  getRootRef?: React.Ref<SVGSVGElement>;
  title?: string;
}

interface SvgIconRootProps extends SvgIconProps {
  baseClassName: string;
}

export function SvgIconRoot({
  width = 0,
  height = 0,
  display = 'block',
  'aria-hidden': ariaHidden = true,
  className,
  baseClassName,
  getRootRef,
  style,
  title,
  children,
  ...restProps
}: SvgIconRootProps) {
  const size = Math.max(width, height);

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: title прокидывается снаружи
    <svg
      aria-hidden={ariaHidden}
      display={display}
      className={classNames(
        className,
        'vkuiIcon',
        `vkuiIcon--${size}`,
        `vkuiIcon--w-${width}`,
        `vkuiIcon--h-${height}`,
        baseClassName,
      )}
      width={width}
      height={height}
      style={{
        width,
        height,
        ...style,
      }}
      ref={getRootRef}
      {...restProps}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}
