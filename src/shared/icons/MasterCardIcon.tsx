import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';

const MasterCardIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.MasterCardIcon, style]} fill="none" viewBox="0 0 24 24">
    <G clipPath="url(#clip0_79_1520)">
      <Path d="M15.237 6.09888H8.74212V17.8513H15.237V6.09888Z" fill="#FF5A00" />
      <Path
        d="M9.17532 11.9753C9.17532 9.58755 10.2898 7.46836 12 6.09909C10.7415 5.10238 9.15375 4.5 7.42194 4.5C3.31946 4.5 0 7.84335 0 11.9753C0 16.1073 3.31946 19.4507 7.42194 19.4507C9.15375 19.4507 10.7415 18.8483 12 17.8516C10.289 16.5016 9.17532 14.3381 9.17532 11.9753Z"
        fill="#EB001B"
      />
      <Path
        d="M24 11.9753C24 16.1073 20.6805 19.4507 16.5781 19.4507C14.8463 19.4507 13.2585 18.8483 12 17.8516C13.2606 16.4799 14.3246 14.3381 14.3246 11.9753C14.3246 9.58755 13.2102 7.46836 12 6.09909C13.2562 5.10238 14.844 4.5 16.5758 4.5C20.6805 4.5 24 7.86445 24 11.9753Z"
        fill="#F79E1B"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_79_1520">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const styles = StyleSheet.create({
  MasterCardIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default MasterCardIcon;
