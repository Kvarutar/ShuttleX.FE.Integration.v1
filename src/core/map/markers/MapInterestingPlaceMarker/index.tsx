import { useEffect, useRef } from 'react';
import {
  type ImageStyle,
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { type LatLng, type MapMarker } from 'react-native-maps';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { useTheme } from '../../../themes/v2/themeContext';
import { AnimatedMarker } from '../../hooks';
import { MapInterestingPlaceMarkerModes, type MapInterestingPlaceMarkerProps } from './types';

const gradientMaxOffset = Platform.OS === 'android' ? '60%' : '100%';

const animationProperties = {
  duration: 1000,
  delay: 500,
};

export const constants = {
  contentAndGradientContainer: {
    width: 250,
    height: 250,
  },
  placeContainer: {
    width: 150,
    height: 150,
  },
};

const markerStylesByMode: Record<
  MapInterestingPlaceMarkerModes,
  {
    placeImageFirst: StyleProp<ImageStyle>;
    placeImageSecond: StyleProp<ImageStyle>;
    placeTitleWrapper: StyleProp<ViewStyle>;
  }
> = {
  mode1: {
    placeImageFirst: {
      zIndex: 1,
      right: '-10%',
    },
    placeImageSecond: {
      top: '-20%',
      left: '-10%',
    },
    placeTitleWrapper: {
      alignSelf: 'stretch',
      flexDirection: 'row',
    },
  },
  mode2: {
    placeImageFirst: {
      zIndex: 1,
      left: '-10%',
    },
    placeImageSecond: {
      top: '-20%',
      right: '-10%',
    },
    placeTitleWrapper: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
  mode3: {
    placeImageFirst: {
      left: '-10%',
      bottom: '-30%',
    },
    placeImageSecond: {
      zIndex: 1,
      top: '-10%',
      right: '-10%',
    },
    placeTitleWrapper: {
      top: '-15%',
      alignSelf: 'stretch',
      flexDirection: 'row',
    },
  },
  mode4: {
    placeImageFirst: {
      zIndex: 1,
      top: '40%',
    },
    placeImageSecond: {
      top: '-40%',
      left: '10%',
    },
    placeTitleWrapper: {
      top: '-15%',
      alignSelf: 'stretch',
      flexDirection: 'row',
    },
  },
};

const markerImagesDefaultRotation: Record<
  MapInterestingPlaceMarkerModes,
  {
    imageFirst: number;
    imageSecond: number;
  }
> = {
  mode1: {
    imageFirst: 10,
    imageSecond: -20,
  },
  mode2: {
    imageFirst: -10,
    imageSecond: 20,
  },
  mode3: {
    imageFirst: -20,
    imageSecond: 20,
  },
  mode4: {
    imageFirst: -20,
    imageSecond: 20,
  },
};

const MapInterestingPlaceMarker = ({
  name,
  coordinate,
  imageFirst,
  imageSecond,
  backgroundGradientColor,
  placesStyles,
  mode = MapInterestingPlaceMarkerModes.Mode1,
}: MapInterestingPlaceMarkerProps) => {
  const { colors } = useTheme();

  const markerRef = useRef<MapMarker>(null);
  const markerCoordinates = useSharedValue<LatLng>(coordinate);
  const imageFirstRotationShared = useSharedValue(markerImagesDefaultRotation[mode].imageFirst);
  const imageSecondRotationShared = useSharedValue(markerImagesDefaultRotation[mode].imageSecond);

  const { placeImageFirst, placeImageSecond, placeTitleWrapper } = markerStylesByMode[mode];

  const setCurrentMarkerPosition = (latlng: LatLng) => {
    markerRef.current?.setNativeProps({ coordinate: latlng });
  };

  useDerivedValue(() => {
    runOnJS(setCurrentMarkerPosition)(markerCoordinates.value);
  }, [markerCoordinates]);

  useEffect(() => {
    markerCoordinates.value = withTiming(coordinate, {
      easing: Easing.linear,
      duration: animationProperties.duration,
    });
  }, [markerCoordinates, coordinate]);

  useEffect(() => {
    imageFirstRotationShared.value = withRepeat(
      withSequence(
        withTiming(markerImagesDefaultRotation[mode].imageFirst + 5, {
          duration: animationProperties.duration,
          easing: Easing.inOut(Easing.cubic),
        }),
        withTiming(markerImagesDefaultRotation[mode].imageFirst, {
          duration: animationProperties.duration,
          easing: Easing.inOut(Easing.cubic),
        }),
      ),
      -1,
      false,
    );
    imageSecondRotationShared.value = withDelay(
      animationProperties.delay,
      withRepeat(
        withSequence(
          withTiming(markerImagesDefaultRotation[mode].imageSecond - 5, {
            duration: animationProperties.duration,
            easing: Easing.inOut(Easing.cubic),
          }),
          withTiming(markerImagesDefaultRotation[mode].imageSecond, {
            duration: animationProperties.duration,
            easing: Easing.inOut(Easing.cubic),
          }),
        ),
        -1,
        false,
      ),
    );
  }, [mode, imageFirstRotationShared, imageSecondRotationShared]);

  const imageFirstAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${imageFirstRotationShared.value}deg` }],
  }));

  const imageSecondAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${imageSecondRotationShared.value}deg` }],
  }));

  const computedStyles = StyleSheet.create({
    contentAndGradientContainer: {
      width: constants.contentAndGradientContainer.width,
      height: constants.contentAndGradientContainer.height,
    },
    placeContainer: {
      width: constants.placeContainer.width,
      height: constants.placeContainer.height,
    },
    placeImage: {
      borderColor: colors.backgroundPrimaryColor,
    },
    placeTitleContainer: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    placeTitle: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
  });

  return (
    <>
      <AnimatedMarker
        ref={markerRef}
        coordinate={coordinate}
        anchor={{ x: 0.5, y: 0.5 }} // centers icon
        flat
        tracksViewChanges
      >
        <View
          style={[
            styles.contentAndGradientContainer,
            computedStyles.contentAndGradientContainer,
            placesStyles.contentAndGradientContainerStyle,
          ]}
        >
          <Svg
            style={StyleSheet.absoluteFill}
            width={placesStyles.gradientWidthAndHeight}
            height={placesStyles.gradientWidthAndHeight}
            //Need for re-render this marker and correct recalculating size of it
            key={placesStyles.gradientWidthAndHeight}
          >
            <Defs>
              <RadialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <Stop offset="0%" stopColor={backgroundGradientColor} />
                <Stop offset={gradientMaxOffset} stopColor="white" stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#gradient)" />
          </Svg>
          <Animated.View
            style={[styles.placeContainer, computedStyles.placeContainer, placesStyles.placesContainerStyle]}
          >
            {(mode === MapInterestingPlaceMarkerModes.Mode1 || mode === MapInterestingPlaceMarkerModes.Mode2) && (
              <MapInterestingPlaceMarkerTitle
                name={name}
                placeTitle={computedStyles.placeTitle}
                placeTitleContainer={computedStyles.placeTitleContainer}
                placeTitleWrapper={placeTitleWrapper}
              />
            )}

            <Animated.View style={[styles.placeImagesContainer]}>
              <Animated.Image
                style={[styles.placeImage, computedStyles.placeImage, placeImageFirst, imageFirstAnimatedStyle]}
                source={{ uri: imageFirst.uri }}
              />
              <Animated.Image
                style={[styles.placeImage, computedStyles.placeImage, placeImageSecond, imageSecondAnimatedStyle]}
                source={{ uri: imageSecond.uri }}
              />
            </Animated.View>

            {(mode === MapInterestingPlaceMarkerModes.Mode3 || mode === MapInterestingPlaceMarkerModes.Mode4) && (
              <MapInterestingPlaceMarkerTitle
                name={name}
                placeTitle={computedStyles.placeTitle}
                placeTitleContainer={computedStyles.placeTitleContainer}
                placeTitleWrapper={placeTitleWrapper}
              />
            )}
          </Animated.View>
        </View>
      </AnimatedMarker>
    </>
  );
};

const MapInterestingPlaceMarkerTitle = ({
  placeTitleWrapper,
  placeTitleContainer,
  placeTitle,
  name,
}: {
  placeTitleWrapper: StyleProp<ViewStyle>;
  placeTitleContainer: StyleProp<ViewStyle>;
  placeTitle: StyleProp<TextStyle>;
  name: string;
}) => (
  <View style={placeTitleWrapper}>
    <Animated.View style={[styles.placeTitleContainer, placeTitleContainer]}>
      <Text style={[styles.placeTitle, placeTitle]} numberOfLines={1} adjustsFontSizeToFit>
        {name}
      </Text>
    </Animated.View>
  </View>
);

const styles = StyleSheet.create({
  contentAndGradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeImagesContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeImage: {
    height: '50%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 3,
  },
  placeTitleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  placeTitle: {
    fontFamily: 'Inter SemiBold',
    fontSize: 14,
  },
});

export default MapInterestingPlaceMarker;
