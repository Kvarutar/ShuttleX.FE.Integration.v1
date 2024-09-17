import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/v2/themeContext';

const ProfileIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }) => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;
  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_8627_24045)">
        <Path
          d="M14.7067 8.73061C14.7067 10.9045 13.1638 12.4612 11.4998 12.4612C9.83581 12.4612 8.29297 10.9045 8.29297 8.73061C8.29297 6.55671 9.83581 5 11.4998 5C13.1638 5 14.7067 6.55671 14.7067 8.73061Z"
          stroke={svgColor}
          strokeWidth={2}
        />
        <Path
          d="M3.94922 17.3542C3.94922 15.5096 5.83068 14.1703 7.67186 14.7733C8.41999 15.0183 9.1598 15.2441 9.80266 15.4096C10.4152 15.5674 11.0354 15.6968 11.4992 15.6968C11.963 15.6968 12.5832 15.5674 13.1958 15.4096C13.8386 15.2441 14.5785 15.0183 15.3266 14.7733C17.1678 14.1703 19.0492 15.5096 19.0492 17.3542C19.0492 18.8154 17.8646 20 16.4034 20H6.59506C5.1338 20 3.94922 18.8154 3.94922 17.3542Z"
          stroke={svgColor}
          strokeWidth={2}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_8627_24045">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default ProfileIcon;
