import { Image, type ImageStyle } from 'react-native';

const ComfortEcoCar = ({ style }: { style?: ImageStyle }) => <Image source={require('./Car.png')} style={style} />;

export default ComfortEcoCar;
