import { Image, type ImageStyle, StyleSheet } from 'react-native';

const PassengerDefaultCarImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/PassengerDefaultCar.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 128,
    height: 44,
  },
});

export default PassengerDefaultCarImage;
