import { type ShadowProps } from 'react-native-shadow-2';

// All values are slightly different from figma due to differences in shadow rendering between css and react-native-shadow-2

const DISABLED_SHADOW_COLOR = 'rgba(0, 0, 0, 0)';

const defaultShadow = (color: string): ShadowProps => ({
  distance: 19, // distance = CSS blur-radius / 2, e.g., 38 / 2 = 19
  offset: [6, 6], // offset = CSS offset / 2 * 3/4
  startColor: color,
});

const buttonShadow = (color: string): ShadowProps => ({
  distance: 19,
  offset: [2, 2],
  startColor: color,
});

export { buttonShadow, defaultShadow, DISABLED_SHADOW_COLOR };
