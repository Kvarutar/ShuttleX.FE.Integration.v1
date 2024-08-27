import { type Palette, type PaletteButtonModes } from './paletteTypes';

const colors: Omit<Palette, 'buttonModes'> = {
  primaryColor: '#CEFC28',
  primaryGradientStartColor: '#EEF5FF',
  secondaryGradientStartColor: '#EAEAEA',
  secondaryGradientEndColor: '#010101',
  errorColor: '#FF4A00',
  warningColor: '#FFE54E',
  successColor: '#d5ff3b',
  borderColor: '#DEE3E4',
  backgroundPrimaryColor: '#FFFFFF',
  backgroundSecondaryColor: '#F3F3F3',
  backgroundTertiaryColor: '#000000',
  iconPrimaryColor: '#000000',
  iconSecondaryColor: '#C5CACD',
  iconTertiaryColor: '#FFFFFF',
  outlineColor: '#FFFFFF',
  strokeColor: '#B4B4B466',
  textPrimaryColor: '#000000',
  textSecondaryColor: '#6E7A81',
  textTertiaryColor: '#FFFFFF',
  weakShadowColor: 'rgba(0, 0, 0, 0.02)',
  strongShadowColor: 'rgba(0, 0, 0, 0.04)',
};

const buttonModes: PaletteButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    backgroundColorOnPress: '#D5FF3BFF', // random color
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
