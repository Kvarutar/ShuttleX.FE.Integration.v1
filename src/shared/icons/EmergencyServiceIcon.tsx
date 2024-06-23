import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';

const EmergencyServiceIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg style={[styles.EmergencyServiceIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.683 12.8735V17.6258H7.178V12.8735C7.178 10.2488 9.30576 8.12102 11.9305 8.12102C14.5552 8.12102 16.683 10.2488 16.683 12.8735ZM5.39585 12.8735C5.39585 9.26452 8.3215 6.33887 11.9305 6.33887C15.5394 6.33887 18.4651 9.26452 18.4651 12.8735V17.6258V17.8099C19.7019 18.0169 20.6444 19.0923 20.6444 20.3878C20.6444 21.8314 19.4742 23.0016 18.0306 23.0016H5.83258C4.389 23.0016 3.21875 21.8314 3.21875 20.3878C3.21875 19.0931 4.16017 18.0182 5.39585 17.8103V17.6258V12.8735ZM5.83258 19.5561H18.0306C18.4899 19.5561 18.8623 19.9285 18.8623 20.3878C18.8623 20.8471 18.4899 21.2195 18.0306 21.2195H5.83258C5.37326 21.2195 5.0009 20.8471 5.0009 20.3878C5.0009 19.9285 5.37326 19.5561 5.83258 19.5561Z"
      fill="#FF7777"
    />
    <Path d="M11.9316 3.61383V1" stroke="#FF7777" strokeWidth={1.78215} strokeLinecap="round" />
    <Path d="M4.84827 7.42076L3 5.57251" stroke="#FF7777" strokeWidth={1.78215} strokeLinecap="round" />
    <Path d="M19.1185 7.42076L20.9668 5.57251" stroke="#FF7777" strokeWidth={1.78215} strokeLinecap="round" />
  </Svg>
);

const styles = StyleSheet.create({
  EmergencyServiceIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default EmergencyServiceIcon;
