import { Image, type ImageStyle, StyleSheet } from 'react-native';

const BusinessImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../../assets/img/Business.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 754,
    height: 240,
  },
});

export default BusinessImage;
