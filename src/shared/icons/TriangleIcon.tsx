import { type LayoutChangeEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

type TriangleIconProps = {
  onLayout?: (event: LayoutChangeEvent) => void;
  color?: string;
};

export const TriangleIcon = ({ onLayout, color }: TriangleIconProps): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.backgroundTertiaryColor;

  return (
    <Svg width="9" height="5" viewBox="0 0 9 5 " fill="none" onLayout={onLayout}>
      <Path d="M4.5 5L9 0H0L4.5 5Z" fill={svgColor} />
    </Svg>
  );
};
