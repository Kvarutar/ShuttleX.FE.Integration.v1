import { type Palette, type PaletteButtonModes } from './paletteTypes';

const colors: Omit<Palette, 'buttonModes'> = {
  primaryColor: '#5295F7',
  errorColor: '#FF7777',
  borderColor: '#B4B4B44D', // with opacity
  backgroundPrimaryColor: '#FFFFFF',
  backgroundSecondaryColor: '#F3F3F3',
  backgroundTertiaryColor: '#000000',
  outlineColor: '#FFFFFF',
  strokeColor: '#B4B4B466',
  textPrimaryColor: '#000000',
  textSecondaryColor: '#B4B4B4',
  weakShadowColor: 'rgba(0, 0, 0, 0.02)',
  strongShadowColor: 'rgba(0, 0, 0, 0.04)',
};

const buttonModes: PaletteButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    backgroundColorOnPress: '#3281F5',
    textColor: '#FFFFFF',
  },
  mode2: {
    backgroundColor: colors.backgroundPrimaryColor,
    backgroundColorOnPress: colors.backgroundPrimaryColor,
    textColor: colors.textPrimaryColor,
    shadowColor: 'rgba(0, 0, 0, 0.03)',
  },
  mode3: {
    backgroundColor: colors.backgroundTertiaryColor,
    backgroundColorOnPress: '#222222',
    textColor: '#FFFFFF',
  },
};

export const lightPalette: Palette = {
  ...colors,
  buttonModes,
};
