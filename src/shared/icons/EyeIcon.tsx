import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const EyeIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.LikeIcon, style]} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M21.4581 9.78111C21.5602 10.1156 21.8745 10.3333 22.2124 10.3333V10.3256C22.3348 10.3267 22.4557 10.2993 22.5654 10.2457C22.6751 10.192 22.7705 10.1136 22.844 10.0167C22.9174 9.91975 22.9667 9.8071 22.9881 9.68782C23.0094 9.56854 23.0021 9.44596 22.9667 9.33C22.9423 9.25222 20.3416 1 11.9987 1C3.6558 1 1.05739 9.25222 1.03381 9.33778C0.908097 9.75 1.14382 10.1778 1.56025 10.3022C1.97669 10.4267 2.4167 10.1933 2.54242 9.78111C2.62806 9.48556 4.84382 2.55556 11.9995 2.55556C19.1535 2.55556 21.3614 9.48011 21.4581 9.78111ZM7.28823 10.3333C7.28823 9.09566 7.78492 7.90867 8.66904 7.0335C9.55316 6.15833 10.7523 5.66667 12.0026 5.66667C13.2529 5.66667 14.4521 6.15833 15.3362 7.0335C16.2203 7.90867 16.717 9.09566 16.717 10.3333C16.717 11.571 16.2203 12.758 15.3362 13.6332C14.4521 14.5083 13.2529 15 12.0026 15C10.7523 15 9.55316 14.5083 8.66904 13.6332C7.78492 12.758 7.28823 11.571 7.28823 10.3333Z"
        fill={svgColor}
        stroke={svgColor}
        strokeWidth={0.962085}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  LikeIcon: {
    width: 24,
    height: 16,
  },
});

export default EyeIcon;
