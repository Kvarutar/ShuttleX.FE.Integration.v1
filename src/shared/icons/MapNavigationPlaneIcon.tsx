import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const MapNavigationPlaneIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const svgColor = color ?? '#969CA0';

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.354657 4.22649L15.383 0.0185506C15.7476 -0.083534 16.0835 0.252414 15.9815 0.616998L11.7735 15.6453C11.6506 16.0843 11.0451 16.1272 10.8616 15.71L7.70739 8.54143C7.65855 8.43024 7.5697 8.34149 7.45851 8.29255L0.290034 5.13842C-0.127218 4.95484 -0.0843081 4.3494 0.354657 4.22649Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});

export default MapNavigationPlaneIcon;
