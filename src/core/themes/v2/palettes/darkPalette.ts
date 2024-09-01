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
    textColor: colors.textPrimaryColor,
  },
  mode2: {
    backgroundColor: '#000000',
    backgroundColorOnPress: '#222222',
    textColor: colors.textPrimaryColor,
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
  mode5: {
    backgroundColor: '#F3F3F3',
    backgroundColorOnPress: '#E34000',
    textColor: colors.textTertiaryColor,
  },
};

export const darkPalette: Palette = {
  ...colors,
  squareButtonModes,
  circleButtonModes,
};
