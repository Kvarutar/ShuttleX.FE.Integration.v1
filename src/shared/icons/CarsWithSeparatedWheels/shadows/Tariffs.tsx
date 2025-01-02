import { Image, type ImageStyle } from 'react-native';

const TariffsCarShadow = ({ style }: { style?: ImageStyle }) => (
  <Image source={require('./Tariffs.png')} style={style} />
);

export default TariffsCarShadow;
