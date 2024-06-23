import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const FeedbackThumbDownIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
      <Rect width={30} height={30} rx={8} fill={svgColor} />
      <Path
        d="M12.9171 17.3903C12.94 17.5244 13.0422 17.7853 13.2664 18.1837C13.4795 18.5623 13.7645 18.9999 14.0877 19.4686C14.3868 19.9025 14.7099 20.3509 15.0283 20.7926C15.0529 20.8267 15.0775 20.8608 15.102 20.8949C15.4268 21.3457 15.7459 21.79 16.0145 22.188C16.2986 22.3488 16.5708 22.3962 16.7259 22.3478C16.7869 22.3287 17.091 22.218 17.1994 21.2902L16.5703 18.4482C16.3702 17.5442 17.1662 16.7922 18.0085 16.906C18.8212 17.0158 20.0125 17.0858 20.8937 16.8025C21.615 16.5706 22.0122 16.229 22.1641 15.9079C22.2949 15.6314 22.3277 15.1873 21.8732 14.4973C20.8019 12.8712 19.024 10.3438 18.2202 9.21469C18.2085 9.20611 18.1912 9.19389 18.1671 9.17818C18.1047 9.13754 18.0233 9.09062 17.9305 9.04222C17.7543 8.95032 17.5783 8.87438 17.4731 8.83715C17.4623 8.83549 17.4332 8.83084 17.3789 8.82473C17.2888 8.81459 17.1657 8.80411 17.0159 8.7943C16.7173 8.77475 16.3347 8.75929 15.9395 8.753C15.5435 8.7467 15.1444 8.74976 14.811 8.76596C14.6441 8.77407 14.5007 8.78515 14.3861 8.79877C14.3291 8.80554 14.2833 8.81248 14.248 8.81906C14.2306 8.82231 14.2172 8.8252 14.2074 8.82754C14.1974 8.82992 14.1931 8.83127 14.1935 8.83115C13.9365 8.91263 13.6279 9.05345 13.3632 9.23531C13.1013 9.41528 12.9441 9.5927 12.8762 9.73461C12.8743 9.74303 12.8713 9.75705 12.8676 9.77775C12.8574 9.83479 12.8463 9.91629 12.8354 10.0244C12.8135 10.2401 12.7956 10.5273 12.7819 10.8705C12.7547 11.5548 12.7459 12.4258 12.7517 13.3169C12.7636 15.1318 12.8357 16.9136 12.9171 17.3903Z"
        stroke={colors.backgroundPrimaryColor}
        strokeWidth={1.5}
      />
      <Path
        d="M8 16.3662H10C10.1381 16.3662 10.25 16.2543 10.25 16.1162V10.1162C10.25 9.97814 10.1381 9.86621 10 9.86621H8C7.86193 9.86621 7.75 9.97814 7.75 10.1162V16.1162C7.75 16.2543 7.86193 16.3662 8 16.3662Z"
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

export default FeedbackThumbDownIcon;
