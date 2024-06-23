import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';

const ChatIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg style={[styles.ChatIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_2595_778)">
      <Path
        d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 13.7597 1.41318 15.4228 2.14781 16.8977C2.34303 17.2897 2.40801 17.7377 2.29483 18.1607L1.63966 20.6094C1.35525 21.6723 2.32771 22.6447 3.39068 22.3604L5.83933 21.7052C6.26232 21.592 6.71033 21.657 7.10228 21.8521C8.57721 22.5868 10.2403 23 12 23Z"
        stroke="white"
        strokeWidth={1.4}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2595_778">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const styles = StyleSheet.create({
  ChatIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default ChatIcon;
