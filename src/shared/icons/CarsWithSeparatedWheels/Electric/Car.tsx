import { Image, type ImageStyle } from 'react-native';

const ElectricCar = ({ style }: { style?: ImageStyle }) => <Image source={require('./Car.png')} style={style} />;

export default ElectricCar;
