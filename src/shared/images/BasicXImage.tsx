import { Image, type ImageStyle, StyleSheet } from 'react-native';

const BasicXImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/BasicX.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 84,
    height: 54,
  },
});

export default BasicXImage;
