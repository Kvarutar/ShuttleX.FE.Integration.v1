import { type ButtonModes, type Palette } from './paletteTypes';

const colors: Omit<Palette, 'buttonModes'> = {
  primaryColor: '#5295F7',
  errorColor: '#FF7777',
  borderColor: '#B4B4B44D', // with opacity
  backgroundPrimaryColor: '#121212',
  backgroundSecondaryColor: '#1B1B1B',
  backgroundTertiaryColor: '#FFFFFF',
  outlineColor: '#000000',
  strokeColor: '#B4B4B466',
  textPrimaryColor: '#FFFFFF',
  textSecondaryColor: '#757575',
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
  },
  mode3: {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
  mode4: {
    backgroundColor: 'transparent',
    textColor: '#FFFFFF',
    strokeColor: '#B4B4B466', // with opacity
  },
};

export const darkPalette: Palette = {
  ...colors,
  buttonModes,
};
