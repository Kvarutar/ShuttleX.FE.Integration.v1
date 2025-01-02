import { Image, type ImageStyle } from 'react-native';

const BasicCar = ({ style }: { style?: ImageStyle }) => <Image source={require('./Car.png')} style={style} />;
export default BasicCar;
