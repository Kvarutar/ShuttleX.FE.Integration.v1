import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const PromocodesIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 5.86957L2.86957 5H21.1304L22 5.86957V10.5434H21.1304C20.35 10.5434 19.7173 11.1761 19.7173 11.9565C19.7173 12.7369 20.35 13.3696 21.1304 13.3696H22V18.0435L21.1304 18.913H2.86957L2 18.0435V13.3696H2.86957C3.64997 13.3696 4.28261 12.7369 4.28261 11.9565C4.28261 11.1761 3.64997 10.5434 2.86957 10.5434H2V5.86957ZM3.73913 6.73913V8.92582C5.05712 9.30327 6.02174 10.5172 6.02174 11.9565C6.02174 13.3958 5.05712 14.6097 3.73913 14.9872V17.1739H8.08696V6.73913H3.73913ZM9.82609 6.73913V17.1739H20.2609V14.9872C18.9428 14.6097 17.9782 13.3958 17.9782 11.9565C17.9782 10.5172 18.9428 9.30327 20.2609 8.92582V6.73913H9.82609Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default PromocodesIcon;
