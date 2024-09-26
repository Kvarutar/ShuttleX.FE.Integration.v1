import { Image, type ImageStyle, StyleSheet } from 'react-native';

const BasicXImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/Basic.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 132,
    height: 47,
  },
});

export default BasicXImage;
