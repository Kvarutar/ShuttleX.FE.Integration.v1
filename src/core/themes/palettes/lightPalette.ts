import { type ButtonModes, type Palette } from './paletteTypes';

const colors: Omit<Palette, 'buttonModes'> = {
  primaryColor: '#5295F7',
  errorColor: '#FF7777',
  borderColor: '#B4B4B44D', // with opacity
  backgroundPrimaryColor: '#FFFFFF',
  backgroundSecondaryColor: '#F3F3F3',
  backgroundTertiaryColor: '#000000',
  outlineColor: '#FFFFFF',
  textPrimaryColor: '#000000',
  textSecondaryColor: '#B4B4B4',
  weakShadowColor: 'rgba(0, 0, 0, 0.02)',
  strongShadowColor: 'rgba(0, 0, 0, 0.04)',
};

const buttonModes: ButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    textColor: '#FFFFFF',
  },
  mode2: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    shadowColor: colors.weakShadowColor,
  },
  mode3: {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
  mode4: {
    backgroundColor: 'transparent',
    textColor: '#000000',
    strokeColor: '#B4B4B466', // with opacity
  },
};

export const lightPalette: Palette = {
  ...colors,
  buttonModes,
};
