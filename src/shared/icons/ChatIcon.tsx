import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const ChatIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.ChatIcon, style]} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 16C12.4182 16 16 12.4182 16 8C16 3.58172 12.4182 0 8 0C3.58172 0 0 3.58172 0 8C0 9.27976 0.300496 10.4893 0.834768 11.562C0.976752 11.847 1.02401 12.1729 0.941696 12.4805L0.465208 14.2614C0.25836 15.0344 0.965608 15.7416 1.73868 15.5348L3.51951 15.0583C3.82714 14.976 4.15297 15.0233 4.43802 15.1652C5.5107 15.6995 6.72024 16 8 16Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  ChatIcon: {
    width: 16,
    height: 16,
  },
});

export default ChatIcon;
