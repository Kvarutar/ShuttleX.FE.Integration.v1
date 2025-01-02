import { Image, type ImageStyle } from 'react-native';

const DefaultCarShadow = ({ style }: { style?: ImageStyle }) => (
  <Image source={require('./Default.png')} style={style} />
);

export default DefaultCarShadow;
