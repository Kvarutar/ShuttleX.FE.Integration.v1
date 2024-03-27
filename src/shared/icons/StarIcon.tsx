import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const StarIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7322 18.2214C10.2616 18.0362 9.73838 18.0362 9.2678 18.2214L5.86521 19.56C4.50449 20.0953 3.04806 19.0371 3.13669 17.5776L3.35833 13.9279C3.38898 13.4231 3.22729 12.9255 2.90581 12.5352L0.58125 9.71276C-0.348355 8.58406 0.207956 6.87192 1.62345 6.5052L5.16303 5.58816C5.65255 5.46134 6.07586 5.15379 6.34775 4.72742L8.31368 1.64446C9.09988 0.411564 10.9001 0.411566 11.6863 1.64446L13.6523 4.72742C13.9241 5.15379 14.3475 5.46134 14.837 5.58816L18.3766 6.5052C19.792 6.87192 20.3484 8.58407 19.4187 9.71276L17.0942 12.5352C16.7727 12.9255 16.611 13.4231 16.6417 13.9279L16.8633 17.5776C16.9519 19.0371 15.4955 20.0953 14.1348 19.56L10.7322 18.2214Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export default StarIcon;
