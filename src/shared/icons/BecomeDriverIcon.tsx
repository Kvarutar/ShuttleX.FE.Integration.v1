import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const BecomeDriverIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_8627_30009)">
        <Path
          d="M19.7998 12.001C19.3857 14.0237 18.3561 15.8688 16.8523 17.2834C15.3485 18.6981 13.444 19.6131 11.3998 19.903V17.878C12.9096 17.6087 14.3104 16.9117 15.4357 15.8697C16.5609 14.8278 17.3635 13.4847 17.7478 12L19.7998 12.001ZM2.25183 12.001C2.63204 13.4685 3.4209 14.798 4.52672 15.835C5.63255 16.8719 7.00994 17.5738 8.49883 17.859V19.889C6.47474 19.5806 4.5939 18.6589 3.10995 17.2483C1.62599 15.8376 0.610298 14.0059 0.199828 12H2.25183V12.001ZM15.9998 9V11H14.9998C13.9736 11 12.9866 11.3944 12.243 12.1017C11.4994 12.809 11.0561 13.775 11.0048 14.8L10.9998 15V16H8.99983V15C8.99983 13.9738 8.60539 12.9868 7.8981 12.2432C7.19082 11.4996 6.22479 11.0563 5.19983 11.005L4.99983 11H3.99983V9H15.9998ZM9.99983 0C15.1848 0 19.4488 3.947 19.9498 9H17.9378C17.6938 7.06689 16.7527 5.28927 15.2913 4.00068C13.8298 2.71208 11.9483 2.00108 9.99983 2.00108C8.05138 2.00108 6.1699 2.71208 4.7084 4.00068C3.24691 5.28927 2.30586 7.06689 2.06183 9H0.0488281C0.550828 3.947 4.81483 0 9.99983 0Z"
          fill={svgColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_8627_30009">
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

export default BecomeDriverIcon;
