import React from 'react';
import { Image, type ImageProps, StyleSheet } from 'react-native';

const LocationArrowImage = ({ style }: { style?: ImageProps['style'] }) => (
  <Image style={[styles.img, style]} source={require('../../assets/img/LocationArrow.png')} />
);

const styles = StyleSheet.create({
  img: {
    width: 42,
    height: 43,
  },
});

export default LocationArrowImage;
