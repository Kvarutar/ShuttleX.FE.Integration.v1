import { Image, type ImageStyle } from 'react-native';

const BasicXLCar = ({ style }: { style?: ImageStyle }) => <Image source={require('./Car.png')} style={style} />;

export default BasicXLCar;
