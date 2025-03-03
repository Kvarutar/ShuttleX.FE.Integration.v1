import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import MapViewClustering from 'react-native-map-clustering';
import MapViewNative, {
  type Camera,
  type EdgePadding,
  type LatLng,
  MapMarker,
  type MapMarkerProps,
  type MapViewProps as NativeMapViewProps,
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
import type SuperCluster from 'supercluster';
import { v4 as uuidv4 } from 'uuid';

import LocationArrowImage from '../../shared/images/LocationArrowImage';
import TopViewCarImage from '../../shared/images/TopViewCarImage';
import { useCompass } from '../../utils/compass';
import { drawArcPolyline } from '../../utils/geolocation/drawArcPolyline';
import MapInterestingPlaceCluster from './clusters/MapInterestingPlaceCluster';
import { type MapInterestingPlaceClusterType } from './clusters/types';
import { AnimatedMarker } from './hooks';
import lightMapStyle from './lightMapStyle.json';
import MapCarsMarkersList from './makersLists/MapCarsMarkersList';
import MapMarkersList from './makersLists/MapMarkersList';
import MapStopPointsList from './makersLists/MapStopPointsList';
import MapInterestingPlaceMarker, {
  constants as MapInterestingPlaceMarkerConstants,
} from './markers/MapInterestingPlaceMarker';
import { type MapInterestingPlace } from './markers/MapInterestingPlaceMarker/types';
import { type MapViewProps, type MapViewRef } from './types';
import { isCoordinatesEqualZero, scaleNumberByZoomLevel } from './utils';

export const mapConstants = {
  cameraZoom: 15.8,
  cameraAndPositionAnimationDuration: 400, // must be more or equal geolocation update interval
  zIndexes: {
    polyline: 0,
    car: 1,
    carThinkingAnimation: 2,
    marker: 3,
    currentGeolocation: 4,
  },
  clustering: {
    initialRegion: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 180,
      longitudeDelta: 360,
    },
    radius: Dimensions.get('window').width * 0.2, // window width * 20%
  },
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
      interestingPlaces,
      withCarsThinkingAnimation = false,
      polylines,
      stopPoints,
      markers,
      cameraMode,
      mapPadding,
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
    const superClusterRef = useRef<SuperCluster<MapInterestingPlace>>(null);
    const currentLocationMarkerRef = useRef<MapMarker>(null);

    const { compassSharedValue } = useCompass();

    const [isMapLoaded, setIsMapLoaded] = useState(false);
    // Don't use it for setting custom zoom level, this state only for handling changes
    const [observedZoomLevel, setObservedZoomLevel] = useState(mapConstants.cameraZoom);

    const currentLocationMarkerCoordinates = useSharedValue<LatLng>({ latitude: 0, longitude: 0 });

    const computedStyles = StyleSheet.create({
      contentAndGradientContainerStyle: {
        width: scaleNumberByZoomLevel(
          observedZoomLevel,
          MapInterestingPlaceMarkerConstants.contentAndGradientContainer.width,
        ),
        height: scaleNumberByZoomLevel(
          observedZoomLevel,
          MapInterestingPlaceMarkerConstants.contentAndGradientContainer.height,
        ),
      },
      placesContainerStyle: {
        width: scaleNumberByZoomLevel(observedZoomLevel, MapInterestingPlaceMarkerConstants.placeContainer.width),
        height: scaleNumberByZoomLevel(observedZoomLevel, MapInterestingPlaceMarkerConstants.placeContainer.height),
      },
    });

    useImperativeHandle(ref, () => ({
      animateCamera: (...args) => {
        mapRef.current?.animateCamera(...args);
      },
      setCamera: arg => {
        mapRef.current?.setCamera(arg);
      },
      getCamera: () => {
        return mapRef.current?.getCamera();
      },
      animateToRegion: (...args) => {
        mapRef.current?.animateToRegion(...args);
      },
      fitToCoordinates: (coordinates, options) => {
        const edgePadding: EdgePadding = {
          top: 100 + (options?.edgePadding?.top ?? 0),
          bottom: 50 + (options?.edgePadding?.bottom ?? 0),
          left: 30 + (options?.edgePadding?.left ?? 0),
          right: 30 + (options?.edgePadding?.right ?? 0),
        };
        mapRef.current?.fitToCoordinates(coordinates, { edgePadding, animated: true });
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

    const onRegionChange = async () => {
      const camera = await mapRef.current?.getCamera();
      if (camera?.zoom) {
        setObservedZoomLevel(camera?.zoom);
      }
    };

    const onRegionChangeComplete = async () => {
      if (onDragComplete) {
        const camera = await mapRef.current?.getCamera();
        if (camera) {
          onDragComplete(camera.center);
        }
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

    const memoizedPolylines: React.ReactNode[] = useMemo(() => {
      const localPolylines: React.ReactNode[] = [];

      polylines?.forEach(polyline => {
        switch (polyline.type) {
          case 'straight': {
            localPolylines.push(
              <Polyline
                key={uuidv4()}
                coordinates={polyline.options.coordinates}
                strokeColor={polyline.options.color ?? '#000'}
                strokeWidth={4}
                zIndex={mapConstants.zIndexes.polyline}
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
              localPolylines.push(
                <Polyline
                  key={uuidv4()}
                  coordinates={coordinates.slice(j, j + 2)}
                  strokeColor={polyline.options.color ?? '#000'}
                  strokeWidth={4}
                  zIndex={mapConstants.zIndexes.polyline}
                />,
              );
            }
            break;
          }
          case 'dashed':
            localPolylines.push(
              <Polyline
                key={uuidv4()}
                lineDashPattern={[50, 30]}
                coordinates={polyline.options.coordinates}
                strokeColor={polyline.options.color ?? '#000'}
                strokeWidth={4}
                zIndex={mapConstants.zIndexes.polyline}
              />,
            );
            break;
          case 'arc': {
            localPolylines.push(
              <>
                <Polyline
                  key={uuidv4()}
                  strokeWidth={3}
                  strokeColor="#000"
                  coordinates={drawArcPolyline(polyline.options.startPoint, polyline.options.endPoint)}
                  zIndex={mapConstants.zIndexes.polyline}
                />
                <Polyline
                  key={uuidv4()}
                  strokeWidth={3}
                  strokeColor="#00000033"
                  coordinates={[polyline.options.startPoint, polyline.options.endPoint]}
                  zIndex={mapConstants.zIndexes.polyline}
                />
              </>,
            );
            break;
          }
        }
      });

      return localPolylines;
    }, [polylines]);

    const mapPaddingProp: NativeMapViewProps['mapPadding'] = useMemo(
      () => ({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        ...mapPadding,
      }),
      [mapPadding],
    );

    const getClusterItems = useCallback((clusterId: number) => {
      if (superClusterRef.current) {
        return superClusterRef.current?.getLeaves(clusterId);
      }
      return [];
    }, []);

    return (
      <Animated.View style={style}>
        {/* Preloads map raster images (easiest way for fixing several bugs on android) */}
        {Platform.OS === 'android' && !isMapLoaded && <LocationArrowImage style={styles.preloadImage} />}
        {Platform.OS === 'android' && !isMapLoaded && <TopViewCarImage style={styles.preloadImage} />}

        {/* For custom marker's component use 'coordinate' instead of 'coordinates' */}
        {/* Otherwise the marker will not be drawn!!! */}
        {/* Example: <CustomMarkerComponent coordinate={marker.coordinates} /> */}

        {/* If you want to prevent clusterization, add "cluster={false}" on marker here (not in child component!)
        or move your markers to the separate child component (f.e. if you have a list) */}
        <MapViewClustering
          ref={mapRef}
          superClusterRef={superClusterRef}
          renderCluster={(cluster: MapInterestingPlaceClusterType) => (
            <MapInterestingPlaceCluster key={cluster.id} cluster={cluster} getClusterItems={getClusterItems} />
          )}
          radius={mapConstants.clustering.radius}
          region={mapConstants.clustering.initialRegion}
          onLayout={onLayout}
          provider="google"
          googleRenderer="LEGACY"
          style={styles.map}
          showsCompass={false}
          showsIndoors={false}
          toolbarEnabled={false}
          pitchEnabled={false}
          customMapStyle={lightMapStyle}
          mapPadding={mapPaddingProp}
          rotateEnabled={cameraMode === 'free'}
          onPanDrag={onDrag}
          onRegionChange={onRegionChange}
          onRegionChangeComplete={onRegionChangeComplete}
          onMapLoaded={() => setIsMapLoaded(true)}
        >
          {geolocationCoordinates && (
            <AnimatedMarker
              ref={currentLocationMarkerRef}
              coordinate={{ latitude: 0, longitude: 0 }}
              anchor={{ x: 0.5, y: 0.5 }} // centers icon
              flat
              zIndex={mapConstants.zIndexes.currentGeolocation}
              {...currentLocationMarkerProps}
              //Here we use '@ts-ignore' to ignore redundant prop 'cluster'
              //cluster={false} - marker will not be clustered
              //This fix is here: https://stackoverflow.com/questions/62888821/how-to-cluster-all-markers-except-one
              // @ts-ignore
              cluster={false}
            />
          )}

          {cars && (
            <MapCarsMarkersList
              zoomLevel={observedZoomLevel}
              withCarsThinkingAnimation={withCarsThinkingAnimation}
              cars={cars}
            />
          )}

          {/* This markers can't be moved to a separate component because they need "coordinate" prop for correct clustering here */}
          {interestingPlaces &&
            interestingPlaces.map(place => (
              <MapInterestingPlaceMarker
                key={place.id}
                id={place.id}
                name={place.name}
                coordinate={place.coordinate}
                imageFirst={place.imageFirst}
                imageSecond={place.imageSecond}
                backgroundGradientColor={place.backgroundGradientColor}
                placesStyles={{
                  contentAndGradientContainerStyle: computedStyles.contentAndGradientContainerStyle,
                  placesContainerStyle: computedStyles.placesContainerStyle,
                  gradientWidthAndHeight: computedStyles.contentAndGradientContainerStyle.height,
                }}
                mode={place.mode}
              />
            ))}

          {memoizedPolylines.length > 0 && memoizedPolylines}

          {stopPoints && stopPoints.length !== 0 && <MapStopPointsList stopPoints={stopPoints} />}

          {markers && <MapMarkersList markers={markers} />}
        </MapViewClustering>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  preloadImage: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  currentLocationMarkerIOS: {
    padding: 12, // fixing bug image cuts off when rotating
  },
});

export default MapView;
