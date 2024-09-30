import { Image, type ImageStyle, StyleSheet } from 'react-native';

const ComfortPlusImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../../assets/img/ComfortPlus.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 612,
    height: 199,
  },
});

export default ComfortPlusImage;
