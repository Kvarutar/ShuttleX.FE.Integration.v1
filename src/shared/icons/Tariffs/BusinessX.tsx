import { Image, type ImageStyle, StyleSheet } from 'react-native';

const BusinessXImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../../assets/img/BusinessX.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 1796,
    height: 844,
  },
});

export default BusinessXImage;
