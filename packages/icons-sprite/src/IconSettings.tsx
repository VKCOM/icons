import React from 'react';

type Props = {
  children?: React.ReactNode;
  classPrefix?: string;
  globalClasses?: boolean;
};

/**
 * @deprecated В v3 будет удалено
 */
export const IconSettingsProvider = ({ children }: Props) => {
  return children;
};
