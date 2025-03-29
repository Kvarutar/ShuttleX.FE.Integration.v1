import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const LoudSpeakerIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 30 30" fill="none">
    <Path
      d="M15.285 8.262a2.01 2.01 0 00-2.065.099l-3.979 2.647H6.207a2.297 2.297 0 00-2.293 2.294v4.134a2.296 2.296 0 002.293 2.294h3.036l3.98 2.647a2.012 2.012 0 003.125-1.675V10.036a2.008 2.008 0 00-1.063-1.774zm-.22 12.44a.726.726 0 01-1.133.606l-4.14-2.755a.641.641 0 00-.357-.108H6.207a1.01 1.01 0 01-1.009-1.009v-4.134a1.01 1.01 0 011.009-1.01h3.228c.127 0 .25-.037.356-.107l4.143-2.754a.727.727 0 011.133.605l-.003 10.666z"
      fill="#000"
    />
    <Path
      d="M19.945 11.105s1.662 1.662 1.662 4.431c0 2.77-1.662 4.43-1.662 4.43M23.168 8.184s2.82 2.589 2.82 7.25c0 4.66-2.82 7.25-2.82 7.25"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default LoudSpeakerIcon;
