import { CircleButtonModes, type SquareButtonModes } from '../../../../shared/atoms/Button/v2/props';
import { TimerColorModes } from '../../../../shared/molecules/timerAndStopwatch/Timer/V2/props';

export type PaletteButtonMode = {
  backgroundColor: string;
  backgroundColorOnPress: string;
  textColor: string;
  shadowColor?: string;
};

export type PaletteTimerMode = {
  backgroundColor: string;
  textColor: string;
  strokeColor?: string;
  lineColor?: string;
};

export type PaletteCircleButtonModes = { [key in CircleButtonModes]: PaletteButtonMode };
export type PaletteSquareButtonModes = { [key in SquareButtonModes]: PaletteButtonMode };

export type PaletteTimerModes = { [key in TimerColorModes]: PaletteTimerMode };

export type Palette = {
  primaryColor: string;
  primaryGradientStartColor: string;
  secondaryGradientStartColor: string;
  secondaryGradientEndColor: string;
  errorColor: string;
  errorColorWithOpacity: string; //TODO: change to design color
  warningColor: string;
  successColor: string;
  borderColor: string;
  borderDashColor: string;
  backgroundPrimaryColor: string;
  backgroundSecondaryColor: string;
  backgroundTertiaryColor: string; // mainly used for the background of some icons
  iconPrimaryColor: string;
  iconSecondaryColor: string;
  iconTertiaryColor: string;
  outlineColor: string; // mainly used for the outline of avatar or arrow of the current position
  strokeColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  textTertiaryColor: string;
  textTitleColor: string;
  draggableColor: string; //TODO: change to design
  circleSeparatorColor: string; //TODO: change to design
  textLinkColor: string;
  weakShadowColor: string; // specified in rgba, opacity = CSS opacity * 2/3, e.g., 0.03 * 2/3 = 0.02
  strongShadowColor: string; // specified in rgba
  squareButtonModes: PaletteSquareButtonModes;
  circleButtonModes: PaletteCircleButtonModes;
  timerColorModes: PaletteTimerModes;
};
