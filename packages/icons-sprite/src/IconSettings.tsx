import type * as React from 'react';

type Props = {
  children?: React.ReactNode | undefined;
  classPrefix?: string | undefined;
  globalClasses?: boolean | undefined;
};

/**
 * @deprecated В v3 будет удалено
 */
export const IconSettingsProvider = ({ children }: Props) => {
  return children;
};
