import { Image, type ImageStyle } from 'react-native';

const ElectricWheel = ({ style }: { style?: ImageStyle }) => <Image source={require('./Wheel.png')} style={style} />;

export default ElectricWheel;
