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
  successColor: '#CEFC28',
  borderColor: '#DEE3E4',
  borderDashColor: '#CFCFCF',
  backgroundPrimaryColor: '#121212',
  backgroundSecondaryColor: '#1B1B1B',
  backgroundTertiaryColor: '#000000',
  iconPrimaryColor: '#FFFFFF',
  iconSecondaryColor: '#C5CACD',
  iconTertiaryColor: '#000000',
  outlineColor: '#000000',
  strokeColor: '#B4B4B466',
  textPrimaryColor: '#FFFFFF',
  textSecondaryColor: '#757575',
  textTertiaryColor: '#A5A8A9',
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

const timerColorModes: PaletteTimerModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    textColor: colors.textPrimaryColor,
    strokeColor: colors.strokeColor,
    lineColor: colors.errorColor,
  },
  mode2: {
    backgroundColor: colors.backgroundPrimaryColor,
    textColor: colors.textPrimaryColor,
    strokeColor: colors.borderDashColor,
    lineColor: colors.iconPrimaryColor,
  },
  mode3: {
    backgroundColor: colors.errorColor,
    textColor: colors.textTertiaryColor,
    strokeColor: colors.iconTertiaryColor,
    lineColor: colors.primaryColor,
  },
  mode4: {
    backgroundColor: colors.backgroundTertiaryColor,
    textColor: colors.iconTertiaryColor,
    strokeColor: colors.strokeColor,
    lineColor: colors.errorColor,
  },
  mode5: {
    backgroundColor: colors.errorColor,
    textColor: colors.textPrimaryColor,
    strokeColor: colors.strokeColor,
    lineColor: colors.iconPrimaryColor,
  },
};

export const darkPalette: Palette = {
  ...colors,
  squareButtonModes,
  circleButtonModes,
  timerColorModes,
};
