import { Image, type ImageStyle } from 'react-native';

const BusinessXCar = ({ style }: { style?: ImageStyle }) => <Image source={require('./Car.png')} style={style} />;

export default BusinessXCar;
