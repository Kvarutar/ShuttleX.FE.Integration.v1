import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';
import LoadingCircularAnimation from './LoadingCircularAnimation';
import { type FogProps } from './types';

const windowWidth = Dimensions.get('window').width;

const Fog = ({ widthInPercents = '100%', withAnimation = false }: FogProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    sidePart: {
      backgroundColor: colors.backgroundSecondaryColor,
      flex: 1,
    },
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={computedStyles.sidePart} />
      <View style={[styles.container, { width: windowWidth, height: windowWidth }]}>
        <Svg>
          <Defs>
            <RadialGradient id="gradient">
              <Stop
                offset={`${Number(widthInPercents.slice(0, -1)) - 20}%`}
                stopColor={colors.backgroundSecondaryColor}
                stopOpacity={0}
              />
              <Stop offset={widthInPercents} stopColor={colors.backgroundSecondaryColor} />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#gradient)" />
        </Svg>
        {withAnimation && <LoadingCircularAnimation widthInPercents={widthInPercents} />}
      </View>
      <View style={computedStyles.sidePart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Fog;
