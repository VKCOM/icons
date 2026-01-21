import type * as React from 'react';
import { type SvgIconProps, SvgIconRoot } from './SvgIconRoot';

interface SvgIconRootV2Props extends SvgIconProps {
  vkuiIconId: string;
  vkuiProps: SvgIconProps;
  vkuiAttrs?: SvgIconProps;
  children?: React.ReactElement;
}

export function SvgIconRootV2({
  vkuiIconId,
  vkuiAttrs,
  children,
  vkuiProps,
  width: widthProp,
  height: heightProp,
  viewBox: viewBoxProp,
  ...restProps
}: SvgIconRootV2Props) {
  const {
    width: widthByUser,
    height: heightByUser,
    viewBox: viewBoxByUser,
    ...restVkuiProps
  } = vkuiProps;

  return (
    <SvgIconRoot
      baseClassName={`vkuiIcon--${vkuiIconId}`}
      width={widthByUser || widthProp}
      height={heightByUser || heightProp}
      viewBox={viewBoxByUser || viewBoxProp}
      {...restProps}
      {...restVkuiProps}
      style={vkuiProps.fill ? { color: vkuiProps.fill, ...vkuiProps.style } : vkuiProps.style}
      {...vkuiAttrs}
    >
      {vkuiProps.children}
      {children}
    </SvgIconRoot>
  );
}
