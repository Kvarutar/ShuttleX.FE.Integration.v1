import { createContext, useContext, useEffect, useState } from 'react';

import palettes from './palettes';
import { type Palette } from './palettes/paletteTypes';

type ThemeContextTypeV1 = {
  colors: Palette;
  themeMode: keyof typeof palettes;
  setThemeMode: (mode: ThemeContextTypeV1['themeMode']) => void;
};

const ThemeContext = createContext<ThemeContextTypeV1 | null>(null);

const useThemeV1 = (): ThemeContextTypeV1 => {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useThemeV1 must be wrapped in a <ThemeProviderV1 />');
  }
  return value;
};

type ThemeProviderV1Props = {
  children: React.ReactNode;
};

const ThemeProviderV1 = ({ children }: ThemeProviderV1Props): JSX.Element => {
  const [themeMode, setThemeMode] = useState<ThemeContextTypeV1['themeMode']>('light');
  const [colors, setColors] = useState<ThemeContextTypeV1['colors']>(palettes[themeMode]);

  useEffect(() => {
    setColors(palettes[themeMode]);
  }, [themeMode]);

  return <ThemeContext.Provider value={{ colors, themeMode, setThemeMode }}>{children}</ThemeContext.Provider>;
};

export { type ThemeContextTypeV1, ThemeProviderV1, useThemeV1 };
