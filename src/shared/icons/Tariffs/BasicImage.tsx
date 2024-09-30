import { Image, type ImageStyle, StyleSheet } from 'react-native';

const BasicImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../../assets/img/Basic.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 601,
    height: 189,
  },
});

export default BasicImage;
