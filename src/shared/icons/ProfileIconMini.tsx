import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const ProfileIconMini = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.20053 4.97229C3.36337 6.68142 4.45374 7.8102 5.99989 7.8102C7.54597 7.8102 8.63623 6.68139 8.79913 4.97229L9.02996 3.12574C9.17315 1.31156 7.71292 0 5.99989 0C4.2868 0 2.82656 1.31156 2.96966 3.12574L3.20053 4.97229Z"
        fill={svgColor}
      />
      <Path
        d="M11.988 12.3792L11.8775 11.6658C11.7849 11.0676 11.4141 10.5513 10.8812 10.2783L8.55573 9.08607C8.48294 9.04875 8.42367 8.9925 8.37399 8.92969C7.70076 9.65133 6.88287 10.0758 6.00004 10.0758C5.11724 10.0758 4.29923 9.65133 3.62603 8.92969C3.57635 8.9925 3.51709 9.04875 3.44429 9.08607L1.11883 10.2783C0.585897 10.5513 0.215138 11.0676 0.122579 11.6658L0.0120158 12.3792C-0.0273719 12.6338 0.0246152 13.0075 0.249613 13.1943C0.550439 13.4437 1.6617 14.9992 6.00004 14.9992C10.3383 14.9992 11.4495 13.4437 11.7504 13.1943C11.9754 13.0075 12.0274 12.6338 11.988 12.3792Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 12,
    height: 15,
  },
});

export default ProfileIconMini;
