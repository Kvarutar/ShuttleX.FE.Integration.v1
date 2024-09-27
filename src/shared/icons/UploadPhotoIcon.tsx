import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Mask, Path, Rect } from 'react-native-svg';

const UploadPhotoIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg style={[styles.style, style]} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect x="0.5" y="0.5" width="63" height="63" rx="31.5" stroke="#ECECEC" />
    <Mask id="path-2-inside-1_11076_25776" fill="white">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37 25.5C37 24.6716 36.3284 24 35.5 24H28.5C27.6716 24 27 24.6716 27 25.5C27 26.3284 26.3284 27 25.5 27H25C23.8954 27 23 27.8954 23 29V36C23 37.6569 24.3431 39 26 39H38C39.6569 39 41 37.6569 41 36V29C41 27.8954 40.1046 27 39 27H38.5C37.6716 27 37 26.3284 37 25.5Z"
      />
    </Mask>
    <Path
      d="M28.5 25.5H35.5V22.5H28.5V25.5ZM25 28.5H25.5V25.5H25V28.5ZM24.5 36V29H21.5V36H24.5ZM38 37.5H26V40.5H38V37.5ZM39.5 29V36H42.5V29H39.5ZM38.5 28.5H39V25.5H38.5V28.5ZM38.5 25.5H35.5C35.5 27.1569 36.8431 28.5 38.5 28.5V25.5ZM42.5 29C42.5 27.067 40.933 25.5 39 25.5V28.5C39.2761 28.5 39.5 28.7239 39.5 29H42.5ZM38 40.5C40.4853 40.5 42.5 38.4853 42.5 36H39.5C39.5 36.8284 38.8284 37.5 38 37.5V40.5ZM21.5 36C21.5 38.4853 23.5147 40.5 26 40.5V37.5C25.1716 37.5 24.5 36.8284 24.5 36H21.5ZM25 25.5C23.067 25.5 21.5 27.067 21.5 29H24.5C24.5 28.7239 24.7239 28.5 25 28.5V25.5ZM25.5 25.5V28.5C27.1569 28.5 28.5 27.1569 28.5 25.5H25.5ZM35.5 25.5H38.5C38.5 23.8431 37.1569 22.5 35.5 22.5V25.5ZM28.5 22.5C26.8431 22.5 25.5 23.8431 25.5 25.5H28.5V22.5Z"
      fill="black"
      mask="url(#path-2-inside-1_11076_25776)"
    />
    <Circle cx="32" cy="32" r="3.25" stroke="black" strokeWidth="1.5" />
  </Svg>
);

const styles = StyleSheet.create({
  style: {
    width: 64,
    height: 64,
  },
});

export default UploadPhotoIcon;
