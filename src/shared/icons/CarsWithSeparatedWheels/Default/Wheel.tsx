import { Image, type ImageStyle } from 'react-native';

const DefaultWheel = ({ style }: { style?: ImageStyle }) => <Image source={require('./Wheel.png')} style={style} />;

export default DefaultWheel;
