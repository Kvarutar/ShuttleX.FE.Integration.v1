import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const LotteryIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }) => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;
  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 18 16" fill="none">
      <Path
        d="M0 4.5C0 3.10218 -5.96046e-08 2.40326 0.22836 1.85195C0.53284 1.11687 1.11687 0.53284 1.85195 0.22836C2.40326 1.78814e-07 3.10218 0 4.5 0H13.5C14.8978 0 15.5967 1.78814e-07 16.1481 0.22836C16.8831 0.53284 17.4672 1.11687 17.7716 1.85195C18 2.40326 18 3.10218 18 4.5V5.25C18 5.66421 17.6642 6 17.25 6H17C15.8954 6 15 6.8954 15 8C15 9.1046 15.8954 10 17 10H17.25C17.6642 10 18 10.3358 18 10.75V11.5C18 12.8978 18 13.5967 17.7716 14.1481C17.4672 14.8831 16.8831 15.4672 16.1481 15.7716C15.5967 16 14.8978 16 13.5 16H4.5C3.10218 16 2.40326 16 1.85195 15.7716C1.11687 15.4672 0.53284 14.8831 0.22836 14.1481C-5.96046e-08 13.5967 0 12.8978 0 11.5V10.75C0 10.3358 0.33579 10 0.75 10H1C2.10457 10 3 9.1046 3 8C3 6.8954 2.10457 6 1 6H0.75C0.33579 6 0 5.66421 0 5.25V4.5Z"
        fill="#2A4157"
        fillOpacity="0.15"
      />
      <Path
        d="M8.59521 4.55156C8.79491 4.27838 9.20271 4.27838 9.40241 4.55156L10.3616 5.8634C10.4233 5.9478 10.5099 6.01076 10.6093 6.04336L12.1533 6.55015C12.4748 6.65576 12.6008 7.04356 12.4028 7.31796L11.4515 8.63555C11.3903 8.72035 11.3572 8.82215 11.3569 8.92665L11.352 10.5518C11.351 10.8903 11.0211 11.1299 10.6989 11.0263L9.15191 10.5288C9.05231 10.4968 8.94531 10.4968 8.84571 10.5288L7.29871 11.0263C6.9765 11.1299 6.64662 10.8903 6.6456 10.5518L6.64068 8.92665C6.64036 8.82215 6.60728 8.72035 6.54608 8.63555L5.59485 7.31796C5.39677 7.04356 5.52277 6.65576 5.8443 6.55015L7.38831 6.04336C7.48771 6.01076 7.57431 5.94781 7.63601 5.8634L8.59521 4.55156Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 16,
  },
});

export default LotteryIcon;
