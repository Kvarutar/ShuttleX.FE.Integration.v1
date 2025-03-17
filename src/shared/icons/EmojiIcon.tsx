import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import { Circle, Svg, Text } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const EmojiIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();
  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 62 62">
      <Circle cx="31" cy="31" r="31" fill={colors.iconTertiaryColor} stroke="#ECECEC" strokeWidth={1} />

      <Text x="50%" y="50%" fontSize="28" textAnchor="middle" dy=".4em">
        🥱
      </Text>
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 62,
    width: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EmojiIcon;
