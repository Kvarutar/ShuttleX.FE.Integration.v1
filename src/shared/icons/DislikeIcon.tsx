import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const DislikeIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.DislikeIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
      <Path
        d="M15.6388 27.0493C13.9693 24.6545 11.5751 20.9115 10.3872 19.2072C10.1396 18.852 10.0005 18.4356 9.9963 18.0027C9.95292 13.5524 9.52395 5.96251 9.99976 5.23818C10.3518 4.7022 11.6905 3.84627 12.7301 3.25035C13.0216 3.08328 13.3516 3 13.6875 3H19.7745C20.5565 3 21.4036 3.66316 21.7294 3.99475C23.1142 5.81844 26.3724 10.1622 28.3274 12.9474C30.1336 15.5208 27.9069 17.5847 26.2728 18.4722C26.0202 18.6094 25.7349 18.6672 25.4475 18.6672H21.3235C20.0334 18.6672 19.0808 19.8706 19.3769 21.1262L20.1869 24.5606C20.2374 24.7749 20.2545 24.9974 20.2239 25.2155C19.7603 28.5245 17.547 28.2548 16.2063 27.5667C15.9747 27.4478 15.7877 27.2629 15.6388 27.0493Z"
        fill={svgColor}
      />
      <Path
        d="M4 20H7C8.10457 20 9 19.1046 9 18V6C9 4.89543 8.10457 4 7 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  DislikeIcon: {
    width: 30,
    height: 30,
  },
});

export default DislikeIcon;
