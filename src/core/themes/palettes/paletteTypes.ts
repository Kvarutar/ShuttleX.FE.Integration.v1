type ButtonMode = {
  backgroundColor: string;
  textColor: string;
  strokeColor?: string;
  rippleColor?: string;
  shadowColor?: string;
};

export type ButtonModes = {
  mode1: ButtonMode;
  mode2: ButtonMode;
  mode3: ButtonMode;
  mode4: ButtonMode;
};

export type Palette = {
  primaryColor: string;
  errorColor: string;
  borderColor: string;
  backgroundPrimaryColor: string;
  backgroundSecondaryColor: string;
  backgroundTertiaryColor: string; // mainly used for the background of some icons
  outlineColor: string; // mainly used for the outline of avatar or arrow of the current position
  textPrimaryColor: string;
  textSecondaryColor: string;
  weakShadowColor: string; // specified in rgba, opacity = CSS opacity * 2/3, e.g., 0.03 * 2/3 = 0.02
  strongShadowColor: string; // specified in rgba
  buttonModes: ButtonModes;
};
