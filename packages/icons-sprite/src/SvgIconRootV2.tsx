import * as React from 'react';
import { SvgIconProps, SvgIconRoot } from './SvgIconRoot';

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
  ...restProps
}: SvgIconRootV2Props) {
  return (
    <SvgIconRoot
      baseClassName={`vkuiIcon--${vkuiIconId}`}
      {...restProps}
      {...vkuiProps}
      style={vkuiProps.fill ? { color: vkuiProps.fill, ...vkuiProps.style } : vkuiProps.style}
      {...vkuiAttrs}
    >
      {vkuiProps.children}
      {children}
    </SvgIconRoot>
  );
}
