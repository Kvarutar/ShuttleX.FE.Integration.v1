import { type LayoutChangeEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

type TriangleIconProps = {
  onLayout?: (event: LayoutChangeEvent) => void;
};

export const TriangleIcon = ({ onLayout }: TriangleIconProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Svg width="9" height="5" viewBox="0 0 9 5 " fill="none" xmlns="http://www.w3.org/2000/svg" onLayout={onLayout}>
      <Path d="M4.5 5L9 0H0L4.5 5Z" fill={colors.backgroundTertiaryColor} />
    </Svg>
  );
};
