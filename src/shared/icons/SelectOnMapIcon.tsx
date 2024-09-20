import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SelectOnMapIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const svgColorMap = color ?? '#32D71A';
  const svgColorLocation = color ?? '#29931A';

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.9781 15.137L14.6456 7.13711C14.5192 6.35462 13.8404 5.78292 13.0499 5.79312H2.94879C2.16084 5.7823 1.48299 6.34981 1.35304 7.12911L0.0205919 15.145C-0.0548797 15.6116 0.0792957 16.0878 0.387125 16.4459C0.694955 16.8039 1.14493 17.0071 1.61634 17.001H14.3823C14.8554 17.0075 15.3069 16.8032 15.6151 16.4433C15.9232 16.0834 16.0562 15.6049 15.9781 15.137Z"
        fill={svgColorMap}
      />
      <Path
        d="M8.49914 0.527587V0.5H7.99914C5.51848 0.5 3.50977 2.51595 3.50977 4.99996C3.50977 6.88845 4.3937 8.69378 5.25136 10.0108C6.07184 11.2707 6.90831 12.1433 7.05155 12.2928C7.05936 12.3009 7.06512 12.3069 7.06869 12.3107L7.06858 12.3108L7.07718 12.3195C7.32077 12.5658 7.65265 12.7045 7.99914 12.7045C8.34563 12.7045 8.67751 12.5658 8.9211 12.3195L8.9212 12.3196L8.92959 12.3107C8.93317 12.3069 8.93892 12.3009 8.94674 12.2928C9.08998 12.1433 9.92645 11.2707 10.7469 10.0108C11.6046 8.69378 12.4885 6.88845 12.4885 4.99996C12.4885 2.6852 10.7442 0.776886 8.49914 0.527587Z"
        fill={svgColorLocation}
        stroke="white"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 17,
  },
});

export default SelectOnMapIcon;
