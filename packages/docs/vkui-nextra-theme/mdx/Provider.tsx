import { MDXProvider, Components } from 'nextra/mdx';
import { Paragraph } from './Paragraph/Paragraph';
import { Header2 } from './Header2/Header2';
import { Header1 } from './Header1/Header1';
import { Code } from './Code/Code';
import { Pre } from './Pre/Pre';
import { A } from './A/A';

export const markdownComponents: Components = {
  h1: Header1,
  h2: Header2,
  p: Paragraph,
  a: A,
  code: Code,
  pre: Pre,
};

/**
 * Configuration.
 */
export interface ContentProviderProps {
  /**
   * Turn off outer component context.
   */
  disableParentContext?: boolean | null | undefined;
  /**
   * Children.
   */
  children?: React.ReactNode | null | undefined;
}

export function ContentProvider(props: ContentProviderProps) {
  return <MDXProvider components={markdownComponents} {...props} />;
}
