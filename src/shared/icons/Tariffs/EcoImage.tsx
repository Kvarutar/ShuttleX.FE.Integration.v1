import { Image, type ImageStyle, StyleSheet } from 'react-native';

const EcoImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../../assets/img/Eco.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 1305,
    height: 429,
  },
});

export default EcoImage;
