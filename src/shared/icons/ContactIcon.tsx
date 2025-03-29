import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const ContactIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.ContactIcon, style]} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.5 6C17.5 9.03886 15.0389 11.5 12 11.5C8.96114 11.5 6.5 9.03886 6.5 6C6.5 2.96114 8.96114 0.5 12 0.5C15.0389 0.5 17.5 2.96114 17.5 6ZM0.5 21C0.5 20.1861 0.903724 19.4363 1.65091 18.7466C2.40149 18.0539 3.46489 17.4563 4.68406 16.9679C7.12321 15.9908 10.06 15.5 12 15.5C13.94 15.5 16.8768 15.9908 19.3159 16.9679C20.5351 17.4563 21.5985 18.0539 22.3491 18.7466C23.0963 19.4363 23.5 20.1861 23.5 21V22.5C23.5 23.0489 23.0489 23.5 22.5 23.5H1.5C0.951142 23.5 0.5 23.0489 0.5 22.5V21Z"
        fill={svgColor}
        stroke={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  ContactIcon: {
    width: 24,
    height: 24,
  },
});

export default ContactIcon;
