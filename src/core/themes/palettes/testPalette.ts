import { type Palette, type PaletteButtonModes } from './paletteTypes';

const colors: Omit<Palette, 'buttonModes'> = {
  primaryColor: '#008D0A',
  primaryGradientStartColor: '#EEF5FF',
  secondaryGradientStartColor: '#EAEAEA',
  secondaryGradientEndColor: '#010101',
  errorColor: '#FF7777',
  borderColor: '#B4B4B44D', // with opacity
  backgroundPrimaryColor: '#FFFFFF',
  backgroundSecondaryColor: '#23FF17',
  backgroundTertiaryColor: '#3717FF',
  iconPrimaryColor: '#000000',
  iconSecondaryColor: '#B4B4B4',
  outlineColor: '#FF8C00',
  strokeColor: '#FF0000',
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
    backgroundColor: '#FFFFFF',
    backgroundColorOnPress: '#FFFFFF',
    textColor: '#000000',
    shadowColor: 'rgba(0, 0, 0, 0.03)',
  },
  mode3: {
    backgroundColor: '#000000',
    backgroundColorOnPress: '#222222',
    textColor: '#FFFFFF',
  },
  mode4: {
    backgroundColor: '#F3F3F3',
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textPrimaryColor,
  },
};

export const testPalette: Palette = {
  ...colors,
  buttonModes,
};
