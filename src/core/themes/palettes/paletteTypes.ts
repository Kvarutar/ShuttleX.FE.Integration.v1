import { type ButtonModes } from '../../../shared/BrandBook/Button/props';

type PaletteButtonMode = {
  backgroundColor: string;
  textColor: string;
  rippleColor?: string;
  shadowColor?: string;
};

export type PaletteButtonModes = { [key in ButtonModes]: PaletteButtonMode };

export type Palette = {
  primaryColor: string;
  errorColor: string;
  borderColor: string;
  backgroundPrimaryColor: string;
  backgroundSecondaryColor: string;
  backgroundTertiaryColor: string; // mainly used for the background of some icons
  outlineColor: string; // mainly used for the outline of avatar or arrow of the current position
  strokeColor: string; //for bar's stroke
  textPrimaryColor: string;
  textSecondaryColor: string;
  weakShadowColor: string; // specified in rgba, opacity = CSS opacity * 2/3, e.g., 0.03 * 2/3 = 0.02
  strongShadowColor: string; // specified in rgba
  buttonModes: PaletteButtonModes;
};
