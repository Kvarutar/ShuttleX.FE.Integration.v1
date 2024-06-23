import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const VisaIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.VisaIcon, style]} fill="none" viewBox="0 0 32 32">
    <G clipPath="url(#clip0_190_784)">
      <Path
        d="M22.0521 12.2489C21.4322 12.023 20.7771 11.9097 20.1174 11.9142C17.9841 11.9142 16.4774 12.9889 16.4667 14.5315C16.4534 15.6649 17.5374 16.3035 18.3574 16.6822C19.1987 17.0715 19.4801 17.3169 19.4774 17.6649C19.4721 18.1942 18.8054 18.4342 18.1854 18.4342C17.3334 18.4342 16.8681 18.3155 16.1521 18.0182L15.8867 17.8942L15.5841 19.6702C16.1027 19.8862 17.0374 20.0715 18.0027 20.0875C20.2707 20.0875 21.7534 19.0195 21.7707 17.3782C21.7894 16.4729 21.2027 15.7889 19.9681 15.2235C19.2174 14.8569 18.7521 14.6115 18.7521 14.2395C18.7521 13.9102 19.1507 13.5582 19.9841 13.5582C20.5387 13.5448 21.0898 13.6488 21.6014 13.8635L21.8014 13.9529L22.1041 12.2369L22.0521 12.2489ZM27.5881 12.0582H25.9214C25.4027 12.0582 25.0121 12.2009 24.7854 12.7155L21.5801 19.9769H23.8481L24.3014 18.7862L27.0694 18.7889C27.1347 19.0675 27.3347 19.9769 27.3347 19.9769H29.3347L27.5881 12.0582ZM13.3987 11.9915H15.5601L14.2081 19.9142H12.0494L13.3987 11.9889V11.9915ZM7.91206 16.3582L8.13606 17.4582L10.2481 12.0582H12.5374L9.13606 19.9662H6.85206L4.9854 13.2702C4.95516 13.1598 4.88416 13.065 4.78673 13.0049C4.11393 12.6573 3.40106 12.3936 2.66406 12.2195L2.6934 12.0529H6.17206C6.64406 12.0715 7.02406 12.2195 7.15073 12.7235L7.91073 16.3622V16.3582H7.91206ZM24.9214 17.1662L25.7827 14.9502C25.7721 14.9742 25.9601 14.4929 26.0694 14.1955L26.2174 14.8795L26.7174 17.1649H24.9201V17.1662H24.9214Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_190_784">
        <Rect width={32} height={32} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const styles = StyleSheet.create({
  VisaIcon: {
    width: 32,
    height: 32,
  },
});

export default VisaIcon;
