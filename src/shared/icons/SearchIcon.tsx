import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const svgColor = color ?? '#6E7A81';

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 18 18" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.8 8.10001C1.8 4.62061 4.62061 1.8 8.10001 1.8C11.5794 1.8 14.4 4.62061 14.4 8.10001C14.4 11.5794 11.5794 14.4 8.10001 14.4C4.62061 14.4 1.8 11.5794 1.8 8.10001ZM8.10001 0C3.6265 0 0 3.6265 0 8.10001C0 12.5736 3.6265 16.2 8.10001 16.2C10.0125 16.2 11.7702 15.5372 13.1559 14.4287L16.4636 17.7364C16.8151 18.0879 17.385 18.0879 17.7364 17.7364C18.0879 17.385 18.0879 16.8151 17.7364 16.4636L14.4287 13.1559C15.5372 11.7702 16.2 10.0125 16.2 8.10001C16.2 3.6265 12.5736 0 8.10001 0Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});

export default SearchIcon;
