import { Image, type ImageStyle, StyleSheet } from 'react-native';

const BasicXLImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/BasicXL.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 84,
    height: 54,
  },
});

export default BasicXLImage;
