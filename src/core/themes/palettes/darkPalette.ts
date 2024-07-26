import { type Palette, type PaletteButtonModes } from './paletteTypes';

const colors: Omit<Palette, 'buttonModes'> = {
  primaryColor: '#5295F7',
  primaryGradientStartColor: '#EEF5FF',
  secondaryGradientStartColor: '#EAEAEA',
  secondaryGradientEndColor: '#010101',
  errorColor: '#FF7777',
  borderColor: '#B4B4B44D', // with opacity
  backgroundPrimaryColor: '#121212',
  backgroundSecondaryColor: '#1B1B1B',
  backgroundTertiaryColor: '#FFFFFF',
  iconPrimaryColor: '#FFFFFF',
  iconSecondaryColor: '#B4B4B4',
  iconTertiaryColor: '#000000',
  outlineColor: '#000000',
  strokeColor: '#B4B4B466',
  textPrimaryColor: '#FFFFFF',
  textSecondaryColor: '#757575',
  textTertiaryColor: '#000000',
  weakShadowColor: 'rgba(0, 0, 0, 0.02)',
  strongShadowColor: 'rgba(0, 0, 0, 0.04)',
};

const buttonModes: PaletteButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    backgroundColorOnPress: '#3281F5',
    textColor: colors.textPrimaryColor,
  },
  mode2: {
    backgroundColor: colors.backgroundTertiaryColor,
    backgroundColorOnPress: colors.backgroundTertiaryColor,
    textColor: colors.textTertiaryColor,
  },
  mode3: {
    backgroundColor: '#000000',
    backgroundColorOnPress: '#222222',
    textColor: colors.textPrimaryColor,
  },
  mode4: {
    backgroundColor: '#F3F3F3',
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textTertiaryColor,
  },
};

export const darkPalette: Palette = {
  ...colors,
  buttonModes,
};
