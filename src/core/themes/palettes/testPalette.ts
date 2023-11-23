import { type ButtonModes, type Palette } from './paletteTypes';

const colors: Omit<Palette, 'buttonModes'> = {
  primaryColor: '#008D0A',
  errorColor: '#FF7777',
  borderColor: '#B4B4B44D', // with opacity
  backgroundPrimaryColor: '#FFFFFF',
  backgroundSecondaryColor: '#23FF17',
  backgroundTertiaryColor: '#3717FF',
  outlineColor: '#FF8C00',
  textPrimaryColor: '#000000',
  textSecondaryColor: '#B4B4B4',
  weakShadowColor: 'rgba(0, 0, 0, 0.02)',
  strongShadowColor: 'rgba(0, 0, 0, 0.04)',
};

const buttonModes: ButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    textColor: '#FFFFFF',
    rippleColor: '#FF0000',
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
    strokeColor: '#FF0000',
  },
};

export const testPalette: Palette = {
  ...colors,
  buttonModes,
};
