import { Image, type ImageStyle } from 'react-native';

const DefaultCar = ({ style }: { style?: ImageStyle }) => <Image source={require('./Car.png')} style={style} />;

export default DefaultCar;
