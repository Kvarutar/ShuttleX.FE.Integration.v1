import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useThemeV1 } from '../../core/themes/v1/themeContext';

const SteeringWheelIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_8627_14562)">
        <Path
          d="M21.7998 14.001C21.3857 16.0237 20.3561 17.8688 18.8523 19.2834C17.3485 20.6981 15.444 21.6131 13.3998 21.903V19.878C14.9096 19.6087 16.3104 18.9117 17.4357 17.8697C18.5609 16.8278 19.3635 15.4847 19.7478 14L21.7998 14.001ZM4.25183 14.001C4.63204 15.4685 5.4209 16.798 6.52672 17.835C7.63255 18.8719 9.00994 19.5738 10.4988 19.859V21.889C8.47474 21.5806 6.5939 20.6589 5.10995 19.2483C3.62599 17.8376 2.6103 16.0059 2.19983 14H4.25183V14.001ZM17.9998 11V13H16.9998C15.9736 13 14.9866 13.3944 14.243 14.1017C13.4994 14.809 13.0561 15.775 13.0048 16.8L12.9998 17V18H10.9998V17C10.9998 15.9738 10.6054 14.9868 9.8981 14.2432C9.19082 13.4996 8.22479 13.0563 7.19983 13.005L6.99983 13H5.99983V11H17.9998ZM11.9998 2C17.1848 2 21.4488 5.947 21.9498 11H19.9378C19.6938 9.06689 18.7527 7.28927 17.2913 6.00068C15.8298 4.71208 13.9483 4.00108 11.9998 4.00108C10.0514 4.00108 8.1699 4.71208 6.7084 6.00068C5.24691 7.28927 4.30586 9.06689 4.06183 11H2.04883C2.55083 5.947 6.81483 2 11.9998 2Z"
          fill={svgColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_8627_14562">
          <Rect width={24} height={24} fill="white" />
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

export default SteeringWheelIcon;
