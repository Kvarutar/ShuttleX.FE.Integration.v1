import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { useTheme } from '../../../core/themes/v2/themeContext';

const windowWidth = Dimensions.get('window').width;

const Fog = (): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    sidePart: {
      backgroundColor: colors.backgroundPrimaryColor,
      flex: 1,
    },
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={computedStyles.sidePart} />
      <View style={{ width: windowWidth, height: windowWidth }}>
        <Svg>
          <Defs>
            <RadialGradient id="gradient">
              <Stop offset="80%" stopColor={colors.backgroundPrimaryColor} stopOpacity={0} />
              <Stop offset="100%" stopColor={colors.backgroundPrimaryColor} />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#gradient)" />
        </Svg>
      </View>
      <View style={computedStyles.sidePart} />
    </View>
  );
};

export default Fog;
