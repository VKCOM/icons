import * as React from 'react';

export type IconAppearance = 'light' | 'dark';
export const appearanceTypes: IconAppearance[] = ['light', 'dark'];

export const IconAppearanceContext = React.createContext<IconAppearance>('light');
export const IconAppearanceProvider = IconAppearanceContext.Provider;

export const useIconAppearance = () => React.useContext(IconAppearanceContext);
