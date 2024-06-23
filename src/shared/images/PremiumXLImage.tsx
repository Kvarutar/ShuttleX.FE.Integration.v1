import { Image, type ImageStyle, StyleSheet } from 'react-native';

const PremiumXLImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/PremiumXL.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 84,
    height: 40,
  },
});

export default PremiumXLImage;
