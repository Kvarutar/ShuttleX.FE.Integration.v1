import { Image, type ImageProps, StyleSheet } from 'react-native';

const TopViewCarImage = ({ style }: { style?: ImageProps['style'] }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/TopViewCar.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 27.3,
    height: 61.35,
  },
});

export default TopViewCarImage;
