import { Image, type ImageStyle, type StyleProp, StyleSheet } from 'react-native';

import sizes from '../../core/themes/sizes';

const LocationArrowImage2 = ({
  style,
  type = 'outlined',
}: {
  style?: StyleProp<ImageStyle>;
  type?: 'outlined' | 'filled';
}): JSX.Element => {
  if (type === 'outlined') {
    return <Image style={[styles.img, style]} source={require('../../assets/img/LocationArrow2_1.png')} />;
  }
  return <Image style={[styles.img, style]} source={require('../../assets/img/LocationArrow2_2.png')} />;
};

const styles = StyleSheet.create({
  img: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default LocationArrowImage2;
