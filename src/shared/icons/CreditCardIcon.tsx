import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const CreditCardIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 21" fill="none">
      <Path
        d="M24 5.0664C24 5.87214 23.352 6.53138 22.56 6.53138H1.44C0.648 6.53138 0 5.87214 0 5.0664V5.05419C0 2.25852 2.22 0 4.968 0H19.02C21.768 0 24 2.27072 24 5.0664Z"
        fill={svgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9.82826V15.9446C0 18.7402 2.22 20.9988 4.968 20.9988H19.02C21.768 20.9988 24 18.728 24 15.9324V9.82826C24 9.02252 23.352 8.36328 22.56 8.36328H1.44C0.648 8.36328 0 9.02252 0 9.82826ZM7.2 16.909H4.8C4.308 16.909 3.9 16.4939 3.9 15.9934C3.9 15.4929 4.308 15.0778 4.8 15.0778H7.2C7.692 15.0778 8.1 15.4929 8.1 15.9934C8.1 16.4939 7.692 16.909 7.2 16.909ZM10.2 16.909H15C15.492 16.909 15.9 16.4939 15.9 15.9934C15.9 15.4929 15.492 15.0778 15 15.0778H10.2C9.708 15.0778 9.3 15.4929 9.3 15.9934C9.3 16.4939 9.708 16.909 10.2 16.909Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 21,
  },
});

export default CreditCardIcon;
