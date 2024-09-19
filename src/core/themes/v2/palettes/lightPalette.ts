import {
  type Palette,
  type PaletteCircleButtonModes,
  type PaletteSquareButtonModes,
  type PaletteTimerModes,
} from './paletteTypes';

const colors: Omit<Palette, 'squareButtonModes' | 'circleButtonModes' | 'timerColorModes'> = {
  primaryColor: '#CEFC28',
  primaryGradientStartColor: '#EEF5FF',
  secondaryGradientStartColor: '#EAEAEA',
  secondaryGradientEndColor: '#010101',
  errorColor: '#FF4A00',
  errorColorWithOpacity: '#FF4A001A',
  warningColor: '#FFE54E',
  successColor: '#d5ff3b',
  borderColor: '#DEE3E4',
  borderDashColor: '#CFCFCF',
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
  textQuadraticColor: '#A5A8A9',
  textTitleColor: '#ACACAC',
  draggableColor: '#3C3C432B', // with opacity
  circleSeparatorColor: '#C1C9CA',
  textLinkColor: '#5295F7',
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
    backgroundColor: colors.backgroundTertiaryColor,
    backgroundColorOnPress: '#222222',
    textColor: colors.textTertiaryColor,
  },
  mode3: {
    backgroundColor: '#FFFFFF38',
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textTertiaryColor,
  },
  mode4: {
    backgroundColor: colors.errorColorWithOpacity,
    backgroundColorOnPress: '#FF4A0033',
    textColor: colors.errorColor,
  },
  mode5: {
    backgroundColor: colors.backgroundSecondaryColor,
    backgroundColorOnPress: '#ebebeb',
    textColor: colors.textPrimaryColor,
  },
};

const circleButtonModes: PaletteCircleButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    backgroundColorOnPress: '#D5FF3BFF', // random color
    textColor: colors.textPrimaryColor,
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
    backgroundColor: colors.backgroundSecondaryColor,
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textPrimaryColor,
  },
  mode5: {
    backgroundColor: colors.errorColor,
    backgroundColorOnPress: '#E34000',
    textColor: colors.textTertiaryColor,
  },
};

const timerColorModes: PaletteTimerModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    textColor: '#000000',
    strokeColor: '#9797972E',
    lineColor: colors.errorColor,
  },
  mode2: {
    backgroundColor: colors.backgroundPrimaryColor,
    textColor: colors.textPrimaryColor,
    strokeColor: '#9797972E',
    lineColor: colors.iconPrimaryColor,
  },
  mode3: {
    backgroundColor: colors.errorColor,
    textColor: colors.outlineColor,
    strokeColor: '#FFFFFF2E',
    lineColor: colors.primaryColor,
  },
  mode4: {
    backgroundColor: colors.iconPrimaryColor,
    textColor: '#FFFFFF',
    strokeColor: '#9797972E',
    lineColor: colors.errorColor,
  },
  mode5: {
    backgroundColor: colors.errorColor,
    textColor: colors.textPrimaryColor,
    strokeColor: '#9797972E',
    lineColor: colors.iconPrimaryColor,
  },
};

export const lightPalette: Palette = {
  ...colors,
  squareButtonModes,
  circleButtonModes,
  timerColorModes,
};
