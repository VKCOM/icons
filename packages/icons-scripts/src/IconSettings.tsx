import React from 'react';

export type IconSettingsInterface = {
  classPrefix?: string;
  globalClasses?: boolean;
};

export const IconSettingsContext = React.createContext<IconSettingsInterface>({});

type Props = IconSettingsInterface & {
  children?: React.ReactNode;
};

export const IconSettingsProvider = ({ children, ...settings }: Props) => {
  const contextValue = React.useMemo(
    () => settings,
    [settings.classPrefix, settings.globalClasses],
  );

  return (
    <IconSettingsContext.Provider value={contextValue}>{children}</IconSettingsContext.Provider>
  );
};
