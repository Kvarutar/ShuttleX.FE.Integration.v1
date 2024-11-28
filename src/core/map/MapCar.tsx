import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { type LatLng, type MapMarker } from 'react-native-maps';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import TopViewCarImage from '../../shared/images/TopViewCarImage';
import { AnimatedMarker } from './hooks';
import { type MapCarProps } from './types';

const rotationAnimationDuration = 600;

const MapCar = ({ coordinates, heading, animationDuration }: MapCarProps) => {
  const markerRef = useRef<MapMarker>(null);
  const markerCoordinates = useSharedValue<LatLng>({ latitude: 0, longitude: 0 });

  const carMarkerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(`${heading}deg`, {
          duration: rotationAnimationDuration,
          easing: Easing.linear,
        }),
      },
    ],
  }));

  const setCurrentCarMarkerPosition = (latlng: LatLng) => {
    markerRef.current?.setNativeProps({ coordinate: latlng });
  };

  useDerivedValue(() => {
    const latlng = markerCoordinates.value;
    runOnJS(setCurrentCarMarkerPosition)(latlng);
  }, [markerCoordinates]);

  useEffect(() => {
    markerCoordinates.value = withTiming(coordinates, {
      easing: Easing.linear,
      duration: animationDuration,
    });
  }, [markerCoordinates, coordinates, animationDuration]);

  return (
    <AnimatedMarker
      ref={markerRef}
      coordinate={{ latitude: 0, longitude: 0 }}
      anchor={{ x: 0.5, y: 0.5 }} // centers icon
      flat
      tracksViewChanges
    >
      <Animated.View style={[styles.container, carMarkerAnimatedStyle]}>
        <TopViewCarImage />
      </Animated.View>
    </AnimatedMarker>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30, // fixing bug image cuts off when rotating
  },
});

export default MapCar;
