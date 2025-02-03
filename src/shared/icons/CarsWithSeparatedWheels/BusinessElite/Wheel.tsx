import { Image, type ImageStyle } from 'react-native';

const BusinessEliteWheel = ({ style }: { style?: ImageStyle }) => (
  <Image source={require('./Wheel.png')} style={style} />
);

export default BusinessEliteWheel;
