import { Image, type ImageStyle, StyleSheet } from 'react-native';

const TeslaXImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/TeslaX.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 84,
    height: 48,
  },
});

export default TeslaXImage;
