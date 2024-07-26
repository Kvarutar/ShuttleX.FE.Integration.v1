import { type Palette, type PaletteButtonModes } from './paletteTypes';

const colors: Omit<Palette, 'buttonModes'> = {
  primaryColor: '#5295F7',
  primaryGradientStartColor: '#EEF5FF',
  secondaryGradientStartColor: '#EAEAEA',
  secondaryGradientEndColor: '#010101',
  errorColor: '#FF7777',
  borderColor: '#B4B4B44D', // with opacity
  backgroundPrimaryColor: '#FFFFFF',
  backgroundSecondaryColor: '#F3F3F3',
  backgroundTertiaryColor: '#000000',
  iconPrimaryColor: '#000000',
  iconSecondaryColor: '#B4B4B4',
  iconTertiaryColor: '#FFFFFF',
  outlineColor: '#FFFFFF',
  strokeColor: '#B4B4B466',
  textPrimaryColor: '#000000',
  textSecondaryColor: '#B4B4B4',
  textTertiaryColor: '#FFFFFF',
  weakShadowColor: 'rgba(0, 0, 0, 0.02)',
  strongShadowColor: 'rgba(0, 0, 0, 0.04)',
};

const buttonModes: PaletteButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    backgroundColorOnPress: '#3281F5',
    textColor: colors.textTertiaryColor,
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
    textColor: colors.textTertiaryColor,
  },
  mode4: {
    backgroundColor: colors.backgroundSecondaryColor,
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textPrimaryColor,
  },
};

export const lightPalette: Palette = {
  ...colors,
  buttonModes,
};
