import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const MailIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 19 15" fill="none">
      <Path
        d="M16.875 0.375C17.3375 0.37486 17.783 0.541606 18.1222 0.84181C18.4613 1.14201 18.6691 1.55349 18.7038 1.99375L18.7083 2.125V12.625C18.7085 13.0665 18.5338 13.4917 18.2193 13.8155C17.9048 14.1392 17.4737 14.3375 17.0125 14.3706L16.875 14.375H2.20833C1.74581 14.3751 1.30031 14.2084 0.961164 13.9082C0.622015 13.608 0.414273 13.1965 0.379584 12.7562L0.375 12.625V2.125C0.374854 1.6835 0.549539 1.25825 0.864039 0.934521C1.17854 0.610787 1.60961 0.412488 2.07083 0.379375L2.20833 0.375H16.875ZM17.5 2.70446L10.5133 9.43475C10.2555 9.68054 9.90604 9.81859 9.54167 9.81859C9.17729 9.81859 8.82781 9.68054 8.57 9.43475L1.60686 2.70446V13.2157H17.5V2.70446ZM16.875 1.57812H2.0472L9.54883 8.57812L16.875 1.57812Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 19,
    height: 15,
  },
});

export default MailIcon;
