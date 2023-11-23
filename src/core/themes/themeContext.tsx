import React, { createContext, useContext, useEffect, useState } from 'react';

import palettes from './palettes';
import { type Palette } from './palettes/paletteTypes';

type ThemeContextType = {
  colors: Palette;
  themeMode: keyof typeof palettes;
  setThemeMode: (mode: ThemeContextType['themeMode']) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const useTheme = (): ThemeContextType => {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useTheme must be wrapped in a <ThemeProvider />');
  }
  return value;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [themeMode, setThemeMode] = useState<ThemeContextType['themeMode']>('light');
  const [colors, setColors] = useState<ThemeContextType['colors']>(palettes[themeMode]);

  useEffect(() => {
    setColors(palettes[themeMode]);
  }, [themeMode]);

  return <ThemeContext.Provider value={{ colors, themeMode, setThemeMode }}>{children}</ThemeContext.Provider>;
};

export { type ThemeContextType, ThemeProvider, useTheme };
