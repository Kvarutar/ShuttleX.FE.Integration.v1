import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'shuttlex-integration';

const Star2Icon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11.3683 0L13.9522 8.2918H22.314L15.5492 13.4164L18.1331 21.7082L11.3683 16.5836L4.60353 21.7082L7.18745 13.4164L0.422663 8.2918H8.78441L11.3683 0Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});

export default Star2Icon;
