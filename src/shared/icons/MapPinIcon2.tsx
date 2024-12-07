import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';
import Text from '../atoms/Text';

export type MapPinIcon2Props = {
  style?: StyleProp<ViewStyle>;
  colorMode?: 'mode1' | 'mode2';
  title?: string;
  subtitle?: string;
};

const MapPinIcon2 = ({ style, colorMode = 'mode1', title, subtitle }: MapPinIcon2Props): JSX.Element => {
  const { colors } = useTheme();

  const mainColor = colorMode === 'mode1' ? colors.primaryColor : colors.errorColor;
  const titleColor = colorMode === 'mode1' ? '#000' : '#FFF';
  const subtitleColor = colorMode === 'mode1' ? '#0000008C' : '#FFFFFF8C'; // 8C - 55% opacity

  const computedStyles = StyleSheet.create({
    title: { color: titleColor },
    subtitle: { color: subtitleColor },
  });

  return (
    <View>
      <Svg style={[styles.icon, style]} viewBox="0 0 47 64" fill="none">
        <Rect opacity="0.381569" x="22" y="43" width="3" height="21" rx="1.5" fill="#000" />
        <Rect x="2" y="2" width="43" height="43" rx="13" fill={mainColor} stroke="#FFF" strokeWidth="3.28563" />
      </Svg>
      <View style={[styles.textContainer]}>
        <Text style={[styles.title, computedStyles.title]}>{title}</Text>
        <Text style={[styles.subtitle, computedStyles.subtitle]}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 47,
    height: 64,
  },
  textContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter Medium',
    fontSize: 17,
    lineHeight: 17,
  },
  subtitle: {
    fontFamily: 'Inter Medium',
    fontSize: 12,
    lineHeight: 12,
  },
});

export default MapPinIcon2;
