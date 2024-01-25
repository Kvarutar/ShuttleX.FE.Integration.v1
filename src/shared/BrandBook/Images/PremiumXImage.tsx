import React from 'react';
import { Image, type ImageStyle, StyleSheet } from 'react-native';

const PremiumXImage = ({ style }: { style?: ImageStyle }) => (
  <Image style={[styles.img, style]} source={require('../../../assets/img/PremiumX.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 84,
    height: 40,
  },
});

export default PremiumXImage;
