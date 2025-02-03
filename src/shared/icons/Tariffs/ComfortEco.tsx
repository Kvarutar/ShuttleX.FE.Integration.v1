import { Image, type ImageStyle, StyleSheet } from 'react-native';

const ComfortEcoImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../../assets/img/ComfortEco.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 1712,
    height: 617,
  },
});

export default ComfortEcoImage;
