import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const FeedbackHeartBrokenIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors, themeMode } = useTheme();

  const color1 = color ?? (themeMode === 'light' ? colors.iconPrimaryColor : colors.iconTertiaryColor);
  const color2 = themeMode === 'light' ? colors.iconTertiaryColor : colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 30 30" fill="none">
      <Rect width={30} height={30} rx={8} fill={color1} />
      <Path
        d="M18.4593 9.75029V9.7503H18.4633C20.568 9.7503 22.25 11.4211 22.25 13.4526C22.25 14.3028 21.8745 15.2048 21.2155 16.1213C20.5603 17.0324 19.6677 17.8979 18.7396 18.6591C17.1355 19.9748 15.4989 20.9198 15.0007 21.1958C14.5049 20.9181 12.8673 19.961 11.2618 18.6379C10.333 17.8725 9.43964 17.0045 8.78395 16.0953C8.12369 15.1797 7.75 14.2858 7.75 13.4526C7.75 11.4211 9.432 9.7503 11.5367 9.7503V9.75035L11.5454 9.75025C12.6613 9.73733 13.7196 10.2192 14.4277 11.0552L14.9962 11.7266L15.5692 11.0589C16.2837 10.2262 17.342 9.74443 18.4593 9.75029Z"
        stroke={color2}
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

export default FeedbackHeartBrokenIcon;
