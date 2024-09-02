import { type Palette, type PaletteCircleButtonModes, type PaletteSquareButtonModes } from './paletteTypes';

const colors: Omit<Palette, 'squareButtonModes' | 'circleButtonModes'> = {
  primaryColor: '#CEFC28',
  primaryGradientStartColor: '#EEF5FF',
  secondaryGradientStartColor: '#EAEAEA',
  secondaryGradientEndColor: '#010101',
  errorColor: '#FF4A00',
  warningColor: '#FFE54E',
  successColor: '#CEFC28',
  borderColor: '#DEE3E4',
  borderDashColor: '#CFCFCF',
  backgroundPrimaryColor: '#121212',
  backgroundSecondaryColor: '#1B1B1B',
  backgroundTertiaryColor: '#FFFFFF',
  iconPrimaryColor: '#FFFFFF',
  iconSecondaryColor: '#C5CACD',
  iconTertiaryColor: '#000000',
  outlineColor: '#000000',
  strokeColor: '#B4B4B466',
  textPrimaryColor: '#FFFFFF',
  textSecondaryColor: '#757575',
  textTertiaryColor: '#000000',
  weakShadowColor: 'rgba(0, 0, 0, 0.02)',
  strongShadowColor: 'rgba(0, 0, 0, 0.04)',
};

const squareButtonModes: PaletteSquareButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    backgroundColorOnPress: '#D5FF3BFF', // random color
    textColor: colors.textTertiaryColor,
  },
  mode2: {
    backgroundColor: colors.backgroundTertiaryColor,
    backgroundColorOnPress: '#222222',
    textColor: colors.textTertiaryColor,
  },
  mode3: {
    backgroundColor: '#FFFFFF38',
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textTertiaryColor,
  },
};

const circleButtonModes: PaletteCircleButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    backgroundColorOnPress: '#D5FF3BFF', // random color
    textColor: colors.textTertiaryColor,
  },
  mode2: {
    backgroundColor: colors.backgroundPrimaryColor,
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textPrimaryColor,
    shadowColor: 'rgba(0, 0, 0, 0.03)',
  },
  mode3: {
    backgroundColor: colors.backgroundTertiaryColor,
    backgroundColorOnPress: '#222222',
    textColor: colors.textTertiaryColor,
  },
  mode4: {
    backgroundColor: colors.borderColor,
    backgroundColorOnPress: '#CBD0D1',
    textColor: colors.textPrimaryColor,
  },
  mode5: {
    backgroundColor: colors.errorColor,
    backgroundColorOnPress: '#E34000',
    textColor: colors.textPrimaryColor,
  },
};

export const darkPalette: Palette = {
  ...colors,
  squareButtonModes,
  circleButtonModes,
};
