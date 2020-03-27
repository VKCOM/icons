import { HTMLAttributes, RefObject, FunctionComponent } from 'react';
export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  width?: number;
  height?: number;
  getRootRef?: RefObject<HTMLDivElement>
}
declare const Icon: FunctionComponent<IconProps>;
export default Icon;
