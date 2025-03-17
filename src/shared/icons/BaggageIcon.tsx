import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const BaggageIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M1.95771 2.23828C1.45835 2.29855 1.13476 2.34374 1.13476 2.34374C0.500237 2.53742 0 2.85184 0 3.4785V6.05174V6.88889V7.56358V10.0366V10.06C0 10.6866 0.493904 10.996 1.13476 11.1947C1.13476 11.1947 1.4601 11.2369 1.95771 11.2932V2.23828Z"
        fill={svgColor}
      />
      <Path
        d="M11.9996 6.95425V3.47814C11.9996 2.85148 11.4865 2.52898 10.8649 2.34338C10.8649 2.34338 10.5007 2.29272 9.94824 2.22656V11.3022C10.5022 11.2413 10.8649 11.1946 10.8649 11.1946C11.5267 10.9802 11.9996 10.6865 11.9996 10.0598V7.59619V6.95425Z"
        fill={svgColor}
      />
      <Path
        d="M9.29312 2.15187C9.04704 2.12524 8.78458 2.09816 8.51208 2.0724L8.454 1.39027C8.44461 0.852482 8.00442 0.417969 7.46466 0.417969H4.53443C3.99445 0.417969 3.55448 0.852482 3.54509 1.39027L3.4857 2.0724C3.17914 2.10144 2.88437 2.132 2.6123 2.16192V11.3644C3.65819 11.473 5.03925 11.5917 5.99933 11.5813C7.0177 11.5758 8.30007 11.4703 9.29312 11.371V2.15187ZM5.99933 1.92763C5.46066 1.92763 4.83378 1.96126 4.2128 2.00951L4.26236 1.43875L4.26367 1.40752C4.26367 1.25817 4.38529 1.13699 4.53443 1.13699H7.46466C7.61402 1.13699 7.73542 1.25839 7.73542 1.40752L7.78651 2.00951C7.16575 1.96126 6.53843 1.92763 5.99933 1.92763Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 12,
    height: 12,
  },
});

export default BaggageIcon;
