import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const ClockIcon2 = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.85538 20.1446C2.02681 18.316 0.999672 15.8359 1 13.25V10.7501C0.999672 8.16413 2.02681 5.68396 3.85538 3.85538C5.68396 2.02681 8.16413 0.999672 10.75 1H13.2499C15.8359 0.999672 18.316 2.02681 20.1446 3.85538C21.9732 5.68396 23.0003 8.16413 23 10.75V13.2499C23.0003 15.8359 21.9732 18.316 20.1446 20.1446C18.316 21.9732 15.8359 23.0003 13.25 23H10.7501C8.16413 23.0003 5.68396 21.9732 3.85538 20.1446ZM10.7499 21H13.2501C15.3056 21.0003 17.277 20.1838 18.7304 18.7304C20.1838 17.277 21.0003 15.3056 21 13.25V10.7499C21.0003 8.6944 20.1838 6.72304 18.7304 5.2696C17.277 3.81616 15.3056 2.99974 13.25 3H10.7499C8.6944 2.99974 6.72304 3.81616 5.2696 5.2696C3.81616 6.72304 2.99974 8.6944 3 10.75V13.2501C2.99974 15.3056 3.81616 17.277 5.2696 18.7304C6.72304 20.1838 8.6944 21.0003 10.7499 21ZM7.86667 9.26667L11.1959 13.7057C11.2612 13.794 11.3385 13.8687 11.4241 13.929C11.547 14.0155 11.6865 14.072 11.8312 14.0968C12.0775 14.1389 12.3392 14.0892 12.5601 13.9396L15.888 11.7209C16.3476 11.4146 16.4717 10.7937 16.1654 10.3342C15.859 9.87466 15.2382 9.75049 14.7786 10.0568L12.2324 11.7543L9.46667 8.06667C9.1353 7.62484 8.50849 7.5353 8.06667 7.86667C7.62484 8.19804 7.5353 8.82484 7.86667 9.26667Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default ClockIcon2;
