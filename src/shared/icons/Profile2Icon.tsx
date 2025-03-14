import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const Profile2Icon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }) => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9.5 9.5C8.19375 9.5 7.07552 9.0349 6.14531 8.10469C5.2151 7.17448 4.75 6.05625 4.75 4.75C4.75 3.44375 5.2151 2.32552 6.14531 1.39531C7.07552 0.465104 8.19375 0 9.5 0C10.8062 0 11.9245 0.465104 12.8547 1.39531C13.7849 2.32552 14.25 3.44375 14.25 4.75C14.25 6.05625 13.7849 7.17448 12.8547 8.10469C11.9245 9.0349 10.8062 9.5 9.5 9.5ZM0 19V15.675C0 15.0021 0.173375 14.3838 0.520125 13.8201C0.866875 13.2565 1.32683 12.8258 1.9 12.5281C3.12708 11.9146 4.37396 11.4546 5.64062 11.1482C6.90729 10.8419 8.19375 10.6883 9.5 10.6875C10.8062 10.6867 12.0927 10.8403 13.3594 11.1482C14.626 11.4562 15.8729 11.9162 17.1 12.5281C17.674 12.825 18.1343 13.2557 18.4811 13.8201C18.8278 14.3846 19.0008 15.0029 19 15.675V19H0Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 19,
    height: 19,
  },
});

export default Profile2Icon;
