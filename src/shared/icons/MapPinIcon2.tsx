import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';
import Text from '../atoms/Text';

export type MapPinIcon2Props = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  subtitle?: string;
};

const MapPinIcon2 = ({ style, title, subtitle }: MapPinIcon2Props): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View>
      <Svg style={[styles.icon, style]} viewBox="0 0 47 64" fill="none">
        <Rect opacity="0.381569" x="22" y="43" width="3" height="21" rx="1.5" fill="#000" />
        <Rect x="2" y="2" width="43" height="43" rx="13" fill={colors.errorColor} stroke="#FFF" strokeWidth="3.28563" />
      </Svg>
      <View style={[styles.textContainer]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
    color: '#FFF',
  },
  subtitle: {
    fontFamily: 'Inter Medium',
    fontSize: 12,
    lineHeight: 12,
    color: '#FFFFFF8C', // 55% opacity
  },
});

export default MapPinIcon2;
