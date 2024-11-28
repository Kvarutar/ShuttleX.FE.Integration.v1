import { Image, type ImageProps, StyleSheet } from 'react-native';

const TopViewCarImage = ({ style }: { style?: ImageProps['style'] }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/TopViewCar.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 36.4,
    height: 81.8,
  },
});

export default TopViewCarImage;
