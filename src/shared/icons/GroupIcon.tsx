import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const GroupIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.GroupIcon, style]} viewBox="0 0 27 25" fill="none">
      <Path
        d="M17.7516 16.8298C16.9229 15.9739 16.4545 14.8098 16.4545 13.5927C16.4545 12.3755 16.9229 11.2114 17.7516 10.3555C18.5798 9.50015 19.6996 9.02273 20.8636 9.02273C22.0277 9.02273 23.1475 9.50015 23.9757 10.3555C24.8044 11.2114 25.2727 12.3755 25.2727 13.5927C25.2727 14.8098 24.8044 15.9739 23.9757 16.8298C23.1475 17.6852 22.0277 18.1626 20.8636 18.1626C19.6996 18.1626 18.5798 17.6852 17.7516 16.8298ZM0.898395 20.8347C1.1512 20.5736 1.49057 20.4301 1.84091 20.4301H10.4318C10.7822 20.4301 11.1215 20.5736 11.3743 20.8347C11.6277 21.0964 11.7727 21.4546 11.7727 21.8313V24.5H0.5V21.8313C0.5 21.4546 0.645061 21.0964 0.898395 20.8347ZM15.6257 20.8347C15.8785 20.5736 16.2178 20.4301 16.5682 20.4301H25.1591C25.5094 20.4301 25.8488 20.5736 26.1016 20.8347C26.3549 21.0964 26.5 21.4546 26.5 21.8313V24.5H15.2273V21.8313C15.2273 21.4546 15.3723 21.0964 15.6257 20.8347ZM3.02432 16.8298C2.19559 15.9739 1.72727 14.8098 1.72727 13.5927C1.72727 12.3755 2.19559 11.2114 3.02432 10.3555C3.85252 9.50015 4.9723 9.02273 6.13636 9.02273C7.30043 9.02273 8.42021 9.50015 9.24841 10.3555C10.0771 11.2114 10.5455 12.3755 10.5455 13.5927C10.5455 14.8098 10.0771 15.9739 9.24841 16.8298C8.42021 17.6852 7.30043 18.1626 6.13636 18.1626C4.9723 18.1626 3.85252 17.6852 3.02432 16.8298ZM10.388 8.3071C9.55922 7.45122 9.09091 6.28706 9.09091 5.06993C9.09091 3.8528 9.55922 2.68864 10.388 1.83276C11.2162 0.977424 12.3359 0.5 13.5 0.5C14.6641 0.5 15.7838 0.977424 16.612 1.83276C17.4408 2.68864 17.9091 3.8528 17.9091 5.06993C17.9091 6.28706 17.4408 7.45122 16.612 8.3071C15.7838 9.16244 14.6641 9.63986 13.5 9.63986C12.3359 9.63986 11.2162 9.16244 10.388 8.3071Z"
        fill={svgColor}
        stroke={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  GroupIcon: {
    width: 27,
    height: 25,
  },
});

export default GroupIcon;
