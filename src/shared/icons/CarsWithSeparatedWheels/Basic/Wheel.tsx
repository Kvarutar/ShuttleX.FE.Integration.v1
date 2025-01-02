import { Image, type ImageStyle } from 'react-native';

const BasicWheel = ({ style }: { style?: ImageStyle }) => <Image source={require('./Wheel.png')} style={style} />;
export default BasicWheel;
