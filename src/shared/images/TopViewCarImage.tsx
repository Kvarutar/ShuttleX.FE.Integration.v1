import { Image, type ImageProps, StyleSheet } from 'react-native';

export const constants = {
  width: 21.84,
  height: 49.08,
};

const TopViewCarImage = ({ style }: { style?: ImageProps['style'] }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/TopViewCar.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: constants.width,
    height: constants.height,
  },
});

export default TopViewCarImage;
