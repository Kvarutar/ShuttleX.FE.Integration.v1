import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const PhoneIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.PhoneIcon, style]} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11.1611 10.2646L10.7562 10.6908C10.7562 10.6908 9.79385 11.704 7.16719 8.93858C4.54054 6.17316 5.50284 5.16006 5.50284 5.16006L5.75779 4.89166C6.38583 4.23044 6.44504 3.16886 5.89709 2.39387L4.77622 0.808543C4.09802 -0.150667 2.78752 -0.277378 2.01017 0.541014L0.614976 2.0099C0.229536 2.4157 -0.0287571 2.94173 0.00256729 3.52528C0.0827005 5.01819 0.720629 8.23023 4.28031 11.978C8.05519 15.9522 11.5971 16.1101 13.0456 15.9672C13.5037 15.922 13.9021 15.6749 14.2232 15.3369L15.4859 14.0075C16.3383 13.1101 16.0979 11.5717 15.0074 10.944L13.3091 9.96649C12.5931 9.55432 11.7207 9.67538 11.1611 10.2646Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  PhoneIcon: {
    width: 16,
    height: 16,
  },
});

export default PhoneIcon;
