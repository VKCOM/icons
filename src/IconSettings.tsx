import React, { createContext, FC, useMemo } from 'react';

export type IconSettingsInterface = {
  classPrefix?: string;
  globalClasses?: boolean;
}

export const IconSettingsContext = createContext<IconSettingsInterface>({});

export const IconSettingsProvider: FC<IconSettingsInterface> = ({ children, ...settings }) => {
  const contextValue = useMemo(() => settings, [settings.classPrefix, settings.globalClasses]);
  return (
    <IconSettingsContext.Provider value={contextValue}>
      {children}
    </IconSettingsContext.Provider>
  );
};
