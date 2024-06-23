import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const MasterCardIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.MasterCardIcon, style]} fill="none" viewBox="0 0 32 32">
    <G clipPath="url(#clip0_190_779)">
      <Path d="M20.316 8.13281H11.6562V23.8028H20.316V8.13281Z" fill="#FF5A00" />
      <Path
        d="M12.2338 15.9671C12.2338 12.7834 13.7198 9.95781 16 8.13212C14.3219 6.80317 12.205 6 9.89592 6C4.42594 6 0 10.4578 0 15.9671C0 21.4764 4.42594 25.9342 9.89592 25.9342C12.205 25.9342 14.3219 25.131 16 23.8021C13.7166 22.0022 12.2338 19.1508 12.2338 15.9671Z"
        fill="#EB001B"
      />
      <Path
        d="M32 15.9671C32 21.4764 27.5741 25.9342 22.1041 25.9342C19.795 25.9342 17.6781 25.131 16 23.8021C18.309 21.9732 19.7662 19.1508 19.7662 15.9671C19.7662 12.7834 18.2802 9.95781 16 8.13212C17.6749 6.80317 19.7918 6 22.1009 6C27.5741 6 32 10.4868 32 15.9671Z"
        fill="#F79E1B"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_190_779">
        <Rect width={32} height={32} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const styles = StyleSheet.create({
  MasterCardIcon: {
    width: 32,
    height: 32,
  },
});

export default MasterCardIcon;
