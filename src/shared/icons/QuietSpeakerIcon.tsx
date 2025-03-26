import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const QuietSpeakerIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M11.984 1.172a2.01 2.01 0 00-2.065.099L5.94 3.918H2.907A2.297 2.297 0 00.613 6.212v4.135a2.296 2.296 0 002.294 2.293h3.036l3.979 2.647a2.012 2.012 0 003.126-1.675V2.946a2.008 2.008 0 00-1.064-1.774zm-.22 12.44a.727.727 0 01-1.133.606l-4.14-2.755a.642.642 0 00-.356-.108H2.906a1.01 1.01 0 01-1.009-1.008V6.212a1.01 1.01 0 011.01-1.01h3.228c.126 0 .25-.037.355-.107l4.143-2.754a.727.727 0 011.133.605l-.002 10.666z"
      fill="#000"
    />
  </Svg>
);

const styles = StyleSheet.create({
  icon: {
    width: 14,
    height: 16,
  },
});

export default QuietSpeakerIcon;
