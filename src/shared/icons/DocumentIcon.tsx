import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const DocumentIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <Path
        d="M11 23.6673H20.9999V21.6673H11V23.6673ZM11 18.3339H20.9999V16.334H11V18.3339ZM8.41027 28.6673C7.73676 28.6673 7.16667 28.4339 6.7 27.9673C6.23333 27.5006 6 26.9305 6 26.257V5.74425C6 5.07074 6.23333 4.50065 6.7 4.03398C7.16667 3.56732 7.73676 3.33398 8.41027 3.33398H19L25.9999 10.3339V26.257C25.9999 26.9305 25.7666 27.5006 25.2999 27.9673C24.8333 28.4339 24.2632 28.6673 23.5897 28.6673H8.41027ZM18 11.3339V5.33395H8.41027C8.30769 5.33395 8.21366 5.37669 8.12817 5.46215C8.0427 5.54764 7.99997 5.64167 7.99997 5.74425V26.257C7.99997 26.3596 8.0427 26.4536 8.12817 26.5391C8.21366 26.6246 8.30769 26.6673 8.41027 26.6673H23.5897C23.6922 26.6673 23.7863 26.6246 23.8718 26.5391C23.9572 26.4536 24 26.3596 24 26.257V11.3339H18Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default DocumentIcon;
