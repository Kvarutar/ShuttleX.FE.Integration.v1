import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const FeedbackThumbUpIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
      <Rect width={30} height={30} rx={8} fill={svgColor} />
      <Path
        d="M12.9171 12.7259C12.94 12.5918 13.0422 12.3309 13.2664 11.9325C13.4795 11.5539 13.7645 11.1164 14.0877 10.6476C14.3868 10.2137 14.7099 9.76535 15.0283 9.32365C15.0529 9.2895 15.0775 9.25539 15.102 9.22133C15.4268 8.77049 15.7459 8.32621 16.0145 7.92823C16.2986 7.76741 16.5708 7.72004 16.7259 7.76844C16.7869 7.78749 17.091 7.89824 17.1994 8.82604L16.5703 11.6681C16.3702 12.572 17.1662 13.324 18.0085 13.2102C18.8212 13.1004 20.0125 13.0304 20.8937 13.3137C21.615 13.5456 22.0122 13.8872 22.1641 14.2083C22.2949 14.4848 22.3277 14.9289 21.8732 15.6189C20.8019 17.245 19.024 19.7724 18.2202 20.9015C18.2085 20.9101 18.1912 20.9223 18.1671 20.938C18.1047 20.9787 18.0233 21.0256 17.9305 21.074C17.7543 21.1659 17.5783 21.2418 17.4731 21.2791C17.4623 21.2807 17.4332 21.2854 17.3789 21.2915C17.2888 21.3016 17.1657 21.3121 17.0159 21.3219C16.7173 21.3415 16.3347 21.3569 15.9395 21.3632C15.5435 21.3695 15.1444 21.3665 14.811 21.3503C14.6441 21.3421 14.5007 21.3311 14.3861 21.3174C14.3291 21.3107 14.2833 21.3037 14.248 21.2972C14.2306 21.2939 14.2172 21.291 14.2074 21.2887C14.1974 21.2863 14.1931 21.2849 14.1935 21.2851C13.9365 21.2036 13.6279 21.0628 13.3632 20.8809C13.1013 20.7009 12.9441 20.5235 12.8762 20.3816C12.8743 20.3732 12.8713 20.3592 12.8676 20.3385C12.8574 20.2814 12.8463 20.1999 12.8354 20.0918C12.8135 19.8761 12.7956 19.5889 12.7819 19.2457C12.7547 18.5614 12.7459 17.6904 12.7517 16.7993C12.7636 14.9844 12.8357 13.2026 12.9171 12.7259Z"
        stroke={colors.backgroundPrimaryColor}
        strokeWidth={1.5}
      />
      <Path
        d="M8 13.75H10C10.1381 13.75 10.25 13.8619 10.25 14V20C10.25 20.1381 10.1381 20.25 10 20.25H8C7.86193 20.25 7.75 20.1381 7.75 20V14C7.75 13.8619 7.86193 13.75 8 13.75Z"
        stroke={colors.backgroundPrimaryColor}
        strokeWidth={1.5}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default FeedbackThumbUpIcon;
