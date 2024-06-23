import { Image, type ImageStyle, StyleSheet } from 'react-native';

const ComfortXImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/ComfortX.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 84,
    height: 50,
  },
});

export default ComfortXImage;
