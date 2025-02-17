import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const PinIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;
  const rectColor = colors.iconTertiaryColor;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.PinIcon, style]} fill="none" viewBox="0 0 20 20">
      <G clip-path="url(#clip0_20321_16541)">
        <Path
          d="M10 9.1665C10.6904 9.1665 11.25 8.60686 11.25 7.9165C11.25 7.22615 10.6904 6.6665 10 6.6665C9.30964 6.6665 8.75 7.22615 8.75 7.9165C8.75 8.60686 9.30964 9.1665 10 9.1665Z"
          fill={svgColor}
        />
        <Path
          d="M9.9987 1.6665C8.24208 1.66642 6.55641 2.35964 5.30807 3.5955C4.05972 4.83136 3.3496 6.50997 3.33203 8.2665C3.33203 12.8332 9.20703 17.9165 9.45703 18.1332C9.60798 18.2623 9.80007 18.3332 9.9987 18.3332C10.1973 18.3332 10.3894 18.2623 10.5404 18.1332C10.832 17.9165 16.6654 12.8332 16.6654 8.2665C16.6478 6.50997 15.9377 4.83136 14.6893 3.5955C13.441 2.35964 11.7553 1.66642 9.9987 1.6665ZM9.9987 10.8332C9.42184 10.8332 8.85793 10.6621 8.37828 10.3416C7.89864 10.0211 7.5248 9.56562 7.30405 9.03266C7.08329 8.49971 7.02553 7.91327 7.13807 7.34749C7.25061 6.78171 7.5284 6.26201 7.9363 5.85411C8.34421 5.44621 8.86391 5.16842 9.42968 5.05588C9.99546 4.94334 10.5819 5.0011 11.1149 5.22186C11.6478 5.44261 12.1033 5.81645 12.4238 6.29609C12.7443 6.77573 12.9154 7.33964 12.9154 7.9165C12.9154 8.69005 12.6081 9.43192 12.0611 9.9789C11.5141 10.5259 10.7722 10.8332 9.9987 10.8332Z"
          fill={svgColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_20321_16541">
          <Rect width="20" height="20" fill={rectColor} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

const styles = StyleSheet.create({
  PinIcon: {
    width: 20,
    height: 20,
  },
});

export default PinIcon;
