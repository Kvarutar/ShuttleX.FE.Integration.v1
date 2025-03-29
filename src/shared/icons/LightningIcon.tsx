import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const LightningIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.errorColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 18 18" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99935 17.3346C13.6017 17.3346 17.3327 13.6036 17.3327 9.0013C17.3327 4.39893 13.6017 0.667969 8.99935 0.667969C4.39697 0.667969 0.666016 4.39893 0.666016 9.0013C0.666016 13.6036 4.39697 17.3346 8.99935 17.3346ZM7.44093 10.5013H8.58268C8.7791 10.5013 8.87735 10.5013 8.93835 10.5623C8.99935 10.6233 8.99935 10.7216 8.99935 10.918V14.6096C8.99935 15.3517 8.99935 15.7229 9.16285 15.7589C9.32643 15.7949 9.48227 15.4581 9.7941 14.7846L12.0703 9.86814C12.5633 8.80305 12.8098 8.27055 12.5641 7.88589C12.3183 7.5013 11.7315 7.5013 10.5578 7.5013H9.41602C9.2196 7.5013 9.12135 7.5013 9.06035 7.4403C8.99935 7.3793 8.99935 7.28105 8.99935 7.08464V3.39308C8.99935 2.65085 8.99935 2.27974 8.83585 2.24373C8.67227 2.20772 8.51643 2.54449 8.2046 3.21802L5.92846 8.13439C5.43536 9.19955 5.18881 9.73205 5.43458 10.1167C5.68036 10.5013 6.26721 10.5013 7.44093 10.5013Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});

export default LightningIcon;
