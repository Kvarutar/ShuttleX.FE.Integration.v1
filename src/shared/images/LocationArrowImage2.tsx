import { Image, type ImageStyle, type StyleProp, StyleSheet } from 'react-native';

import sizes from '../../core/themes/sizes';
import { useThemeV1 } from '../../core/themes/v1/themeContext';

const LocationArrowImage2 = ({
  style,
  type = 'outlined',
}: {
  style?: StyleProp<ImageStyle>;
  type?: 'outlined' | 'filled';
}): JSX.Element => {
  const { themeMode } = useThemeV1();

  const sourceLocationArrow2_1_dark = require('../../assets/img/LocationArrow2_1_dark.png');
  const sourceLocationArrow2_1_light = require('../../assets/img/LocationArrow2_1_light.png');

  let sourceLocationArrow2_1 = sourceLocationArrow2_1_dark;
  // TODO: switch statement would be better if there were more than two themes.
  if (themeMode === 'dark') {
    sourceLocationArrow2_1 = sourceLocationArrow2_1_light;
  }

  if (type === 'outlined') {
    return <Image style={[styles.img, style]} source={sourceLocationArrow2_1} />;
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
