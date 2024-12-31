import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
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
import MapPinIcon2 from '../../shared/icons/MapPinIcon2';
import PickUpIcon from '../../shared/icons/PickUpIcon';
import LocationArrowImage from '../../shared/images/LocationArrowImage';
import TopViewCarImage from '../../shared/images/TopViewCarImage';
import { useCompass } from '../../utils/compass';
import { drawArcPolyline } from '../../utils/geolocation/drawArcPolyline';
import { AnimatedMarker } from './hooks';
import lightMapStyle from './lightMapStyle.json';
import MapCar from './MapCar';
import { type MapViewProps, type MapViewRef } from './types';
import { isCoordinatesEqualZero } from './utils';

export const mapConstants = {
  cameraZoom: 15.8,
  cameraAndPositionAnimationDuration: 400, // must be more or equal geolocation update interval
};

const MapView = forwardRef<MapViewRef, MapViewProps>(
  (
    {
      onLayout,
      style,
      geolocationCoordinates,
      geolocationCalculatedHeading,
      disableSetCameraOnGeolocationAvailable = false,
      cars,
      polylines,
      stopPoints,
      markers,
      cameraMode,
      setCameraModeOnDrag,
      onDragComplete,
      onFirstCameraAnimationComplete,
    },
    ref,
  ): JSX.Element => {
    // Black magic, dont touch (prevents useEffects react to callbacks changes)
    const setCameraModeOnDragRef = useRef<MapViewProps['setCameraModeOnDrag']>();
    useEffect(() => {
      setCameraModeOnDragRef.current = setCameraModeOnDrag;
    }, [setCameraModeOnDrag]);

    const isCameraAnimatingFirstTime = useRef(true);
    const mapRef = useRef<MapViewNative>(null);
    const currentLocationMarkerRef = useRef<MapMarker>(null);

    const { compassSharedValue } = useCompass();

    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const currentLocationMarkerCoordinates = useSharedValue<LatLng>({ latitude: 0, longitude: 0 });

    useImperativeHandle(ref, () => ({
      animateCamera: (...args) => {
        mapRef.current?.animateCamera(...args);
      },
      setCamera: arg => {
        mapRef.current?.setCamera(arg);
      },
      animateToRegion: (...args) => {
        mapRef.current?.animateToRegion(...args);
      },
    }));

    const isInRide = polylines && polylines.length !== 0;

    const animateCamera = async (camera: Partial<Camera>) => {
      if (mapRef.current) {
        const currentCamera = await mapRef.current.getCamera();
        Object.keys(camera).forEach(key => {
          // @ts-ignore
          currentCamera[key] = camera[key];
        });
        mapRef.current.animateCamera(currentCamera, { duration: mapConstants.cameraAndPositionAnimationDuration });
      }
    };

    const currentLocationMarkerAnimatedStyle = useAnimatedStyle(() => {
      const heading = isInRide ? geolocationCalculatedHeading : compassSharedValue.value.headingExtended;

      return {
        transform: [
          {
            rotate: withTiming(`${heading}deg`, {
              duration: mapConstants.cameraAndPositionAnimationDuration,
              easing: Easing.linear,
            }),
          },
        ],
      };
    });

    useEffect(() => {
      if (geolocationCoordinates !== undefined && mapRef.current) {
        // Sets camera without animation on first map render
        if (!disableSetCameraOnGeolocationAvailable && isMapLoaded && isCameraAnimatingFirstTime.current) {
          mapRef.current.setCamera({ center: geolocationCoordinates, zoom: mapConstants.cameraZoom });
          isCameraAnimatingFirstTime.current = false;
          onFirstCameraAnimationComplete?.();
        }

        // Animates currentLocationMarker coordinates
        if (isCoordinatesEqualZero(currentLocationMarkerCoordinates.value)) {
          currentLocationMarkerCoordinates.value = geolocationCoordinates;
        } else {
          currentLocationMarkerCoordinates.value = withTiming(geolocationCoordinates, {
            easing: Easing.linear,
            duration: mapConstants.cameraAndPositionAnimationDuration,
          });
        }

        // Animates camera when cameraMode === 'follow'
        if (cameraMode === 'follow') {
          animateCamera({ heading: 0, center: geolocationCoordinates, zoom: mapConstants.cameraZoom });
        }
      }
    }, [
      isMapLoaded,
      geolocationCoordinates,
      disableSetCameraOnGeolocationAvailable,
      currentLocationMarkerCoordinates,
      cameraMode,
      onFirstCameraAnimationComplete,
    ]);

    const animateCameraWithHeading = (heading: number) => {
      if (geolocationCoordinates) {
        animateCamera({ heading, center: geolocationCoordinates, zoom: mapConstants.cameraZoom });
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

    const rendredPolylines: React.ReactNode[] = [];
    polylines?.map((polyline, i) => {
      switch (polyline.type) {
        case 'straight': {
          rendredPolylines.push(
            <Polyline
              key={i}
              coordinates={polyline.options.coordinates}
              strokeColor={polyline.options.color ?? '#000'}
              strokeWidth={4}
            />,
          );
          break;
        }
        case 'dotted': {
          const coordinates: LatLng[] = [];

          for (let j = 0; j < polyline.options.coordinates.length; j++) {
            const latlng = polyline.options.coordinates[j]!;
            if (j > 0) {
              const prevLatlng = polyline.options.coordinates[j - 1]!;
              const latitude = (prevLatlng.latitude + latlng.latitude) / 2;
              const longitude = (prevLatlng.longitude + latlng.longitude) / 2;
              coordinates.push({ latitude, longitude });
            }
            coordinates.push(latlng);
          }

          for (let j = 0; j < coordinates.length - 1; j += 2) {
            rendredPolylines.push(
              <Polyline
                key={uuidv4()}
                coordinates={coordinates.slice(j, j + 2)}
                strokeColor={polyline.options.color ?? '#000'}
                strokeWidth={4}
              />,
            );
          }
          break;
        }
        case 'dashed': {
          rendredPolylines.push(
            <Polyline
              key={i}
              lineDashPattern={[50, 30]}
              coordinates={polyline.options.coordinates}
              strokeColor={polyline.options.color ?? '#000'}
              strokeWidth={4}
            />,
          );
          break;
        }
        case 'arc': {
          rendredPolylines.push(
            <Polyline
              key={i}
              strokeWidth={3}
              strokeColor="#000"
              coordinates={drawArcPolyline(polyline.options.startPoint, polyline.options.endPoint)}
            />,
            <Polyline
              key={uuidv4()}
              strokeWidth={3}
              strokeColor="#00000033"
              coordinates={[polyline.options.startPoint, polyline.options.endPoint]}
            />,
          );
          break;
        }
      }
    });

    return (
      <>
        {/* Preloads map raster images (easiest way for fixing several bugs on android) */}
        {Platform.OS === 'android' && !isMapLoaded && <LocationArrowImage style={styles.preloadImage} />}
        {Platform.OS === 'android' && !isMapLoaded && <TopViewCarImage style={styles.preloadImage} />}

        <MapViewNative
          ref={mapRef}
          onLayout={onLayout}
          provider="google"
          googleRenderer="LEGACY"
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

          {cars &&
            cars.data.map(carData => (
              <MapCar
                key={carData.id}
                coordinates={carData.coordinates}
                heading={carData.heading}
                animationDuration={cars.animationDuration}
              />
            ))}

          {rendredPolylines.length > 0 && rendredPolylines}

          {stopPoints &&
            stopPoints.length !== 0 &&
            stopPoints.map((elem, i) => (
              <Marker
                key={`${i} ${elem.latitude} ${elem.longitude}`}
                coordinate={elem}
                anchor={{ x: 0.5, y: 0.5 }}
                tracksViewChanges={false}
              >
                <View style={styles.stopPointContainer}>
                  <PickUpIcon style={styles.stopPointIcon} />
                  <View style={styles.stopPointLabelContainer}>
                    <Text style={styles.stopPointLabel}>{i + 1}</Text>
                  </View>
                </View>
              </Marker>
            ))}

          {markers &&
            markers.map((marker, i) => {
              switch (marker.type) {
                case 'simple':
                  return (
                    <Marker
                      key={`${i} ${marker.coordinates}`}
                      coordinate={marker.coordinates}
                      anchor={{ x: 0.5, y: 0.98 }}
                      zIndex={marker.zIndex}
                      tracksViewChanges={false}
                    >
                      <MapPinIcon colorMode={marker.colorMode} />
                    </Marker>
                  );
                case 'withLabel':
                  return (
                    <Marker
                      key={`${i} ${marker.coordinates}`}
                      coordinate={marker.coordinates}
                      anchor={{ x: 0.5, y: 0.98 }}
                      zIndex={marker.zIndex}
                      tracksViewChanges={true}
                    >
                      <MapPinIcon2 colorMode={marker.colorMode} title={marker.title} subtitle={marker.subtitle} />
                    </Marker>
                  );
              }
            })}
        </MapViewNative>
      </>
    );
  },
);

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
