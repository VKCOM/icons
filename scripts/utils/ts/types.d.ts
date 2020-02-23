import {FC, DetailedHTMLProps, HTMLAttributes, RefObject} from 'react';

/**
 * Свойства иконки.
 */
export declare interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width?: number;
  height?: number;
  fill?: string;
  getRootRef?: RefObject<HTMLDivElement>;
}

export declare type TSvgIcon = FC<Props>;
