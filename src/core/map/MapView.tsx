import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapViewNative, {
  type Camera,
  type LatLng,
  MapMarker,
  type MapMarkerProps,
  Marker,
  Polyline,
} from 'react-native-maps';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { v4 as uuidv4 } from 'uuid';

import Text from '../../shared/atoms/Text';
import MapPinIcon from '../../shared/icons/MapPinIcon';
import PickUpIcon from '../../shared/icons/PickUpIcon';
import LocationArrowImage from '../../shared/images/LocationArrowImage';
import { useCompass } from '../../utils/compass';
import { drawArcPolyline } from '../../utils/geolocation/drawArcPolyline';
import { useThemeV1 } from '../themes/v1/themeContext';
import { AnimatedMarker } from './hooks';
import lightMapStyle from './lightMapStyle.json';
import { type MapViewProps } from './types';

const constants = {
  cameraZoom: 15.8,
  cameraAndPositionAnimationDuration: 400, // must be more or equal geolocation update interval
};

const MapView = ({
  style,
  geolocationCoordinates,
  geolocationCalculatedHeading,
  polylines,
  stopPoints,
  finalStopPoint,
  cameraMode,
  setCameraModeOnDrag,
  onDragComplete,
}: MapViewProps): JSX.Element => {
  // Black magic, dont touch (prevents useEffects react to callbacks changes)
  const setCameraModeOnDragRef = useRef<MapViewProps['setCameraModeOnDrag']>();
  useEffect(() => {
    setCameraModeOnDragRef.current = setCameraModeOnDrag;
  }, [setCameraModeOnDrag]);

  const isCameraAnimatingFirstTime = useRef(true);
  const mapRef = useRef<MapViewNative>(null);
  const currentLocationMarkerRef = useRef<MapMarker>(null);

  const { compassSharedValue } = useCompass();
  const { colors } = useThemeV1();

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const currentLocationMarkerCoordinates = useSharedValue<LatLng>({ latitude: 0, longitude: 0 });

  const isInRide = polylines && polylines.length !== 0;

  const animateCamera = async (camera: Partial<Camera>) => {
    if (mapRef.current) {
      const currentCamera = await mapRef.current.getCamera();
      Object.keys(camera).forEach(key => {
        // @ts-ignore
        currentCamera[key] = camera[key];
      });
      mapRef.current.animateCamera(currentCamera, { duration: constants.cameraAndPositionAnimationDuration });
    }
  };

  const currentLocationMarkerAnimatedStyle = useAnimatedStyle(() => {
    const heading = isInRide ? geolocationCalculatedHeading : compassSharedValue.value.headingExtended;

    return {
      transform: [
        {
          rotate: withTiming(`${heading}deg`, {
            duration: constants.cameraAndPositionAnimationDuration,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    if (geolocationCoordinates !== undefined && mapRef.current) {
      // Sets camera without animation on first map render
      if (isMapLoaded && isCameraAnimatingFirstTime.current) {
        mapRef.current.setCamera({ center: geolocationCoordinates, zoom: constants.cameraZoom });
        isCameraAnimatingFirstTime.current = false;
      }

      // Animates currentLocationMarker coordinates
      currentLocationMarkerCoordinates.value = withTiming(geolocationCoordinates, {
        easing: Easing.linear,
        duration: constants.cameraAndPositionAnimationDuration,
      });

      // Animates camera when cameraMode === 'follow'
      if (cameraMode === 'follow') {
        animateCamera({ heading: 0, center: geolocationCoordinates, zoom: constants.cameraZoom });
      }
    }
  }, [isMapLoaded, geolocationCoordinates, cameraMode, currentLocationMarkerCoordinates]);

  const animateCameraWithHeading = (heading: number) => {
    if (geolocationCoordinates) {
      animateCamera({ heading, center: geolocationCoordinates, zoom: constants.cameraZoom });
    }
  };

  useDerivedValue(() => {
    if (geolocationCalculatedHeading && cameraMode === 'followWithCompass') {
      let heading = compassSharedValue.value.heading;
      if (isInRide) {
        heading = geolocationCalculatedHeading;
      }
      runOnJS(animateCameraWithHeading)(heading);
    }
  }, [cameraMode, compassSharedValue, geolocationCoordinates]); // geolocationCoordinates needs for animateCameraWithHeading

  const setCurrentLocationMarkerPosition = (coordinates: LatLng) => {
    currentLocationMarkerRef.current?.setNativeProps({ coordinate: coordinates });
  };

  useDerivedValue(() => {
    const coordinates = currentLocationMarkerCoordinates.value;
    runOnJS(setCurrentLocationMarkerPosition)(coordinates);
  }, [currentLocationMarkerCoordinates]);

  const onDrag = () => {
    if (cameraMode !== 'free') {
      setCameraModeOnDragRef.current?.('free');
    }
  };

  const currentLocationMarkerProps: Pick<MapMarkerProps, 'style' | 'tracksViewChanges' | 'children'> =
    Platform.OS === 'android'
      ? {
          style: currentLocationMarkerAnimatedStyle,
          tracksViewChanges: false, // prevents flickering bug
          children: <LocationArrowImage />,
        }
      : {
          tracksViewChanges: true,
          children: (
            <Animated.View style={[styles.currentLocationMarkerIOS, currentLocationMarkerAnimatedStyle]}>
              <LocationArrowImage />
            </Animated.View>
          ),
        };

  return (
    <>
      {/* Preloads map raster image (easiest way for fixing several bugs on android) */}
      {Platform.OS === 'android' && !isMapLoaded && <LocationArrowImage style={styles.preloadImage} />}

      <MapViewNative
        provider="google"
        ref={mapRef}
        style={style}
        showsCompass={false}
        customMapStyle={lightMapStyle}
        rotateEnabled={cameraMode === 'free'}
        onPanDrag={onDrag}
        onRegionChangeComplete={async () => {
          if (onDragComplete) {
            const camera = await mapRef.current?.getCamera();
            if (camera) {
              onDragComplete(camera.center);
            }
          }
        }}
        onMapLoaded={() => setIsMapLoaded(true)}
      >
        {geolocationCoordinates && (
          <AnimatedMarker
            ref={currentLocationMarkerRef}
            coordinate={{ latitude: 0, longitude: 0 }}
            anchor={{ x: 0.5, y: 0.5 }} // centers icon
            flat
            {...currentLocationMarkerProps}
          />
        )}

        {polylines &&
          polylines.length > 0 &&
          polylines.map((polyline, i) => {
            switch (polyline.type) {
              case 'straight': {
                const polylineOptions = polyline.options;
                return (
                  <Polyline
                    key={i}
                    coordinates={polylineOptions.coordinates}
                    strokeColor={polylineOptions.color ?? colors.primaryColor}
                    strokeWidth={6}
                  />
                );
              }
              case 'dotted': {
                const polylineOptions = polyline.options;
                const coordinates: LatLng[] = [];

                for (let j = 0; j < polylineOptions.coordinates.length; j++) {
                  const latlng = polylineOptions.coordinates[j]!;
                  if (j > 0) {
                    const prevLatlng = polylineOptions.coordinates[j - 1]!;
                    const latitude = (prevLatlng.latitude + latlng.latitude) / 2;
                    const longitude = (prevLatlng.longitude + latlng.longitude) / 2;
                    coordinates.push({ latitude, longitude });
                  }
                  coordinates.push(latlng);
                }

                const lines: JSX.Element[] = [];
                for (let j = 0; j < coordinates.length - 1; j += 2) {
                  lines.push(
                    <Polyline
                      key={j}
                      coordinates={coordinates.slice(j, j + 2)}
                      strokeColor={polylineOptions.color ?? colors.primaryColor}
                      strokeWidth={6}
                    />,
                  );
                }
                return lines;
              }
              case 'arc': {
                const polylineOptions = polyline.options;
                return (
                  <>
                    <Polyline
                      key={i}
                      strokeWidth={3}
                      strokeColor="#000000"
                      coordinates={drawArcPolyline(polylineOptions.startPont, polylineOptions.endPoint)}
                    />
                    <Polyline
                      key={uuidv4()}
                      strokeWidth={3}
                      strokeColor="#00000033"
                      coordinates={[polylineOptions.startPont, polylineOptions.endPoint]}
                    />
                  </>
                );
              }
            }
          })}

        {stopPoints &&
          stopPoints.length !== 0 &&
          stopPoints.map((elem, i) => (
            <Marker key={i + elem.latitude} coordinate={elem} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
              <View style={styles.stopPointContainer}>
                <PickUpIcon style={styles.stopPointIcon} />
                <View style={styles.stopPointLabelContainer}>
                  <Text style={styles.stopPointLabel}>{i + 1}</Text>
                </View>
              </View>
            </Marker>
          ))}

        {finalStopPoint && (
          <Marker coordinate={finalStopPoint} anchor={{ x: 0.5, y: 0.91 }} tracksViewChanges={false}>
            <MapPinIcon />
          </Marker>
        )}
      </MapViewNative>
    </>
  );
};

const styles = StyleSheet.create({
  preloadImage: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  currentLocationMarkerIOS: {
    padding: 12, // fixing bug image cuts off when rotating
  },
  stopPointContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopPointIcon: {
    width: 32,
    height: 32,
  },
  stopPointLabelContainer: {
    position: 'absolute',
    left: 90,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopPointLabel: {
    fontSize: 18,
  },
});

export default MapView;
