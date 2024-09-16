import {
  type Palette,
  type PaletteCircleButtonModes,
  type PaletteSquareButtonModes,
  type PaletteTimerModes,
} from './paletteTypes';

const colors: Omit<Palette, 'squareButtonModes' | 'circleButtonModes' | 'timerColorModes'> = {
  primaryColor: '#008D0A',
  primaryGradientStartColor: '#EEF5FF',
  secondaryGradientStartColor: '#EAEAEA',
  secondaryGradientEndColor: '#010101',
  errorColor: '#FF7777',
  errorColorWithOpacity: '#FF4A001A',
  warningColor: '#FFE54E',
  successColor: '#4FAD40',
  borderColor: '#B4B4B44D', // with opacity
  borderDashColor: '#CFCFCF',
  backgroundPrimaryColor: '#FFFFFF',
  backgroundSecondaryColor: '#23FF17',
  backgroundTertiaryColor: '#EFF1F2',
  iconPrimaryColor: '#000000',
  iconSecondaryColor: '#B4B4B4',
  iconTertiaryColor: '#FFFFFF',
  outlineColor: '#FF8C00',
  strokeColor: '#FF0000',
  textPrimaryColor: '#000000',
  textSecondaryColor: '#B4B4B4',
  textTertiaryColor: '#A5A8A9',
  textTitleColor: '#ACACAC',
  draggableColor: '#3C3C432B',
  circleSeparatorColor: '#C1C9CA',
  textLinkColor: '#5295F7',
  weakShadowColor: 'rgba(0, 0, 0, 0.02)',
  strongShadowColor: 'rgba(0, 0, 0, 0.04)',
};

const squareButtonModes: PaletteSquareButtonModes = {
  mode1: {
    backgroundColor: colors.primaryColor,
    backgroundColorOnPress: '#3281F5',
    textColor: '#FFFFFF',
  },
  mode2: {
    backgroundColor: '#000000',
    backgroundColorOnPress: '#222222',
    textColor: '#FFFFFF',
  },
  mode3: {
    backgroundColor: '#F3F3F3',
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textPrimaryColor,
  },
};

const circleButtonModes: PaletteCircleButtonModes = {
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
  mode5: {
    backgroundColor: '#F3F3F3',
    backgroundColorOnPress: '#E2E2E2',
    textColor: colors.textPrimaryColor,
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
    textColor: '#000000',
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

export const testPalette: Palette = {
  ...colors,
  squareButtonModes,
  circleButtonModes,
  timerColorModes,
};
