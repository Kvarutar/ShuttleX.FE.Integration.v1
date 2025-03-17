import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const DislikeIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.6064 21.0624C11.1432 18.9648 9.04567 15.6866 8.00478 14.1943C7.78837 13.8833 7.66658 13.519 7.6622 13.1398C7.62453 9.24155 7.24865 2.59502 7.66571 1.96006C7.97412 1.49063 9.14643 0.740935 10.0576 0.218952C10.3135 0.0726922 10.6026 0 10.897 0H16.2294C16.9145 0 17.6575 0.580662 17.9423 0.871431C19.1558 2.46803 22.0103 6.27255 23.7232 8.71168C25.3065 10.966 23.3553 12.7737 21.9236 13.5505C21.7019 13.6705 21.4522 13.7213 21.2008 13.7213H17.5874C16.4563 13.7213 15.6222 14.7758 15.8815 15.8749L16.5912 18.8833C16.635 19.0708 16.6499 19.2652 16.6237 19.4561C16.2171 22.355 14.2781 22.1186 13.1032 21.516C12.9008 21.4118 12.737 21.2498 12.6064 21.0624Z"
        fill={svgColor}
      />
      <Path
        d="M2.40859 14.8887H5.03709C6.00526 14.8887 6.78943 14.1048 6.78943 13.1371V2.62735C6.78943 1.65958 6.00526 0.875732 5.03709 0.875732H2.40859C1.44042 0.875732 0.65625 1.65958 0.65625 2.62735V13.1371C0.65625 14.1048 1.44042 14.8887 2.40859 14.8887Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 22,
  },
});

export default DislikeIcon;
