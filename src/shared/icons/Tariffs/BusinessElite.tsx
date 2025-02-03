import { Image, type ImageStyle, StyleSheet } from 'react-native';

const BusinessEliteImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../../assets/img/BusinessElite.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 1720,
    height: 860,
  },
});

export default BusinessEliteImage;
