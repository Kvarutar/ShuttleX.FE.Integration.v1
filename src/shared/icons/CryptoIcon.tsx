import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const CryptoIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none">
      <Path
        d="M0.000932693 8.45C0.000932693 12.688 3.12092 16.185 7.1769 16.796V16.718C7.5799 11.674 11.6749 7.579 16.7579 7.176H16.7969C16.1859 3.12 12.6889 0 8.45089 0C3.78391 0 0.000932693 3.783 0.000932693 8.45Z"
        fill={svgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.874 9.12756C12.7531 9.45256 9.45108 12.7546 9.12609 16.8756C9.11308 17.0966 9.10008 17.3306 9.10008 17.5516C9.10008 22.2186 12.8831 26.0016 17.55 26.0016C22.217 26.0016 26 22.2186 26 17.5516C26 12.8846 22.217 9.10156 17.55 9.10156C17.329 9.10156 17.095 9.11456 16.874 9.12756ZM17.55 20.8016L16.406 18.6956L14.3001 17.5516L16.406 16.4076L17.55 14.3016L18.694 16.4076L20.8 17.5516L18.694 18.6956L17.55 20.8016Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default CryptoIcon;
