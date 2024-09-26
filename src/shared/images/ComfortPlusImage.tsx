import { Image, type ImageStyle, StyleSheet } from 'react-native';

const ComfortPlusImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/ComfortPlus.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 132,
    height: 43,
  },
});

export default ComfortPlusImage;
