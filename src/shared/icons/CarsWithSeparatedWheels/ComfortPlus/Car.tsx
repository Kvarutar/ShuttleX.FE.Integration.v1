import { Image, type ImageStyle } from 'react-native';

const ComfortPlusCar = ({ style }: { style?: ImageStyle }) => <Image source={require('./Car.png')} style={style} />;

export default ComfortPlusCar;
