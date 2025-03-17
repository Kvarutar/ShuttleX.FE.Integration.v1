import { Image, type ImageSourcePropType, type ImageStyle, type StyleProp, StyleSheet } from 'react-native';

const LocationArrowImage2 = ({
  style,
  colorMode = 'first',
}: {
  style?: StyleProp<ImageStyle>;
  colorMode?: 'first' | 'second';
}): JSX.Element => {
  // TODO: for theme support
  // const { themeMode } = useTheme();

  // const sourceLocationArrow2_1_dark = require('../../assets/img/LocationArrow2_1_dark.png');
  // const sourceLocationArrow2_1_light = require('../../assets/img/LocationArrow2_1_light.png');

  // let sourceLocationArrow2_1 = sourceLocationArrow2_1_dark;
  // // TODO: switch statement would be better if there were more than two themes.
  // if (themeMode === 'dark') {
  //   sourceLocationArrow2_1 = sourceLocationArrow2_1_light;
  // }

  const getImgSource = (): ImageSourcePropType => {
    switch (colorMode) {
      case 'first':
        return require('../../assets/img/LocationArrow2_1.png');
      case 'second':
        return require('../../assets/img/LocationArrow2_2.png');
    }
  };

  return <Image style={[styles.img, style]} source={getImgSource()} />;
};

const styles = StyleSheet.create({
  img: {
    width: 17,
    height: 15,
  },
});

export default LocationArrowImage2;
