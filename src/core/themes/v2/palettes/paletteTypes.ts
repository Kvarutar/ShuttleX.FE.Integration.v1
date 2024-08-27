import { type ButtonModes } from '../../../../shared/atoms/Button/V2/props';

type PaletteButtonMode = {
  backgroundColor: string;
  backgroundColorOnPress: string;
  textColor: string;
  shadowColor?: string;
};

export type PaletteButtonModes = { [key in ButtonModes]: PaletteButtonMode };

export type Palette = {
  primaryColor: string;
  primaryGradientStartColor: string;
  secondaryGradientStartColor: string;
  secondaryGradientEndColor: string;
  errorColor: string;
  warningColor: string;
  successColor: string;
  borderColor: string;
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
  weakShadowColor: string; // specified in rgba, opacity = CSS opacity * 2/3, e.g., 0.03 * 2/3 = 0.02
  strongShadowColor: string; // specified in rgba
  buttonModes: PaletteButtonModes;
};
