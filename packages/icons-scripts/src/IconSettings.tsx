import React from 'react';

export type IconSettingsInterface = {
  classPrefix?: string;
  globalClasses?: boolean;
}

export const IconSettingsContext = React.createContext<IconSettingsInterface>({});

export const IconSettingsProvider: React.FC<IconSettingsInterface> = ({ children, ...settings }) => {
  const contextValue = React.useMemo(() => settings, [settings.classPrefix, settings.globalClasses]);

  return (
    <IconSettingsContext.Provider value={contextValue}>
      {children}
    </IconSettingsContext.Provider>
  );
};
