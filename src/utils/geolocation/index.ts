import Geolocation from '@react-native-community/geolocation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus, type NativeEventSubscription, Platform } from 'react-native';
import BackgroundActions, { type BackgroundTaskOptions } from 'react-native-background-actions';
import DeviceInfo from 'react-native-device-info';
import { type LatLng } from 'react-native-maps';
import { type LocationAccuracy } from 'react-native-permissions';

import i18nIntegration from '../../core/locales/i18n';
import { secToMilSec } from '..';
import { checkGeolocationPermissionAndAccuracy, requestGeolocationPermission } from '../permissions';
import { type Nullable } from '../typescript';
import { geolocationConsts } from './consts';
import { type useGeolocationStartWatchArgs } from './types';

const EARTH_RADIUS_IN_METERS = 6378137;

/**
 * Сonverts degrees to radians
 * @param deg angle value in degrees
 * @returns angle value in radians
 */
const degToRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Сonverts radians to degrees
 * @param rad angle value in radians
 * @returns angle value in degrees
 */
const radToDeg = (rad: number) => rad * (180 / Math.PI);

/**
 * Calculates the distance between two geolocation points
 * @param p1 first point
 * @param p2 second point
 * @returns distance between points in meters
 */
const getDistanceBetweenPoints = (p1: LatLng, p2: LatLng) => {
  const dLat = degToRad(p2.latitude - p1.latitude);
  const dLong = degToRad(p2.longitude - p1.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degToRad(p1.latitude)) * Math.cos(degToRad(p2.latitude)) * Math.sin(dLong / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS_IN_METERS * c;
  return d;
};

/**
 * Calculates the angle between two points relative to the north
 * @param p1 first point
 * @param p2 second point
 * @returns angle between points relative to the north
 */
const getAngleBetweenPoints = (p1: LatLng, p2: LatLng) => {
  const lat1 = degToRad(p1.latitude);
  const lat2 = degToRad(p2.latitude);

  const dlng = degToRad(p2.longitude - p1.longitude);
  const y = Math.sin(dlng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dlng);

  return (radToDeg(Math.atan2(y, x)) + 360) % 360;
};

const t = i18nIntegration.t;

const useGeolocationStartWatch = ({
  onLocationEnabledChange,
  onPermissionGrantedChange,
  onAccuracyChange,
  onCoordinatesChange,
  onError,
  withAndroidTrackingInBackground = false,
}: useGeolocationStartWatchArgs) => {
  // Black magic, dont touch (prevents useEffects react to callbacks changes)
  const onLocationEnabledChangeRef = useRef<useGeolocationStartWatchArgs['onLocationEnabledChange']>();
  const onPermissionGrantedChangeRef = useRef<useGeolocationStartWatchArgs['onPermissionGrantedChange']>();
  const onAccuracyChangeRef = useRef<useGeolocationStartWatchArgs['onAccuracyChange']>();
  const onCoordinatesChangeRef = useRef<useGeolocationStartWatchArgs['onCoordinatesChange']>();
  const onErrorRef = useRef<useGeolocationStartWatchArgs['onError']>();
  useEffect(() => {
    onLocationEnabledChangeRef.current = onLocationEnabledChange;
  }, [onLocationEnabledChange]);
  useEffect(() => {
    onPermissionGrantedChangeRef.current = onPermissionGrantedChange;
  }, [onPermissionGrantedChange]);
  useEffect(() => {
    onAccuracyChangeRef.current = onAccuracyChange;
  }, [onAccuracyChange]);
  useEffect(() => {
    onCoordinatesChangeRef.current = onCoordinatesChange;
  }, [onCoordinatesChange]);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState<boolean | null>(null);
  const [accuracy, setAccuracy] = useState<LocationAccuracy | null>(null);

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const watchId = useRef<null | number>(null);

  const changeIsLocationEnabled = (flag: boolean) => {
    setIsLocationEnabled(flag);
    onLocationEnabledChangeRef.current?.(flag);
  };
  const changeIsPermissionGranted = (flag: boolean) => {
    setIsPermissionGranted(flag);
    onPermissionGrantedChangeRef.current?.(flag);
  };
  const changeAccuracy = (locationAccuracy: LocationAccuracy) => {
    setAccuracy(locationAccuracy);
    onAccuracyChangeRef.current?.(locationAccuracy);
  };

  useEffect(() => {
    const checks = async () => {
      const isLocationEnabledRes = await DeviceInfo.isLocationEnabled();
      changeIsLocationEnabled(isLocationEnabledRes);

      if (isLocationEnabledRes) {
        const res = await checkGeolocationPermissionAndAccuracy(withAndroidTrackingInBackground);
        changeIsPermissionGranted(res.isGranted);
        changeAccuracy(res.accuracy);
      }
    };

    (async () => {
      await requestGeolocationPermission(withAndroidTrackingInBackground);
      await checks();
      setInterval(checks, geolocationConsts.checkInterval);
    })();
  }, [withAndroidTrackingInBackground]);

  const startForegroundTracking = useCallback(() => {
    if (watchId.current === null) {
      watchId.current = Geolocation.watchPosition(
        position => onCoordinatesChangeRef.current?.(position.coords),
        err => onErrorRef.current?.(err),
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
          interval: geolocationConsts.updateInterval,
          fastestInterval: geolocationConsts.updateInterval,
        },
      );
    }
  }, []);

  const stopForegroundTracking = useCallback(() => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const startBackgroundTracking = useCallback(async () => {
    const backgroundTask = async () => {
      const getCurrentPosition = () =>
        new Promise<void>((resolve, reject) => {
          Geolocation.getCurrentPosition(
            position => {
              onCoordinatesChangeRef.current?.(position.coords);
              resolve();
            },
            error => {
              onErrorRef.current?.(error);
              reject(error);
            },
            {
              enableHighAccuracy: true,
            },
          );
        });

      await new Promise<void>(resolve => {
        const intervalId = setInterval(async () => {
          if (!BackgroundActions.isRunning()) {
            clearInterval(intervalId);
            resolve();
            return;
          }

          await getCurrentPosition();
        }, secToMilSec(5));
      });
    };

    const options: BackgroundTaskOptions = {
      taskName: 'location-tracking',
      taskTitle: t('geolocation_backgroundTask_title'),
      taskDesc: t('geolocation_backgroundTask_desc'),
      taskIcon: { name: 'ic_launcher_round', type: 'drawable' },
      color: 'lime',
    };

    await BackgroundActions.start(backgroundTask, options);
  }, []);

  const stopBackgroundTracking = useCallback(async () => {
    await BackgroundActions.stop();
  }, []);

  useEffect(() => {
    let subscription: Nullable<NativeEventSubscription> = null;

    if (isLocationEnabled && isPermissionGranted && accuracy === 'full') {
      if (Platform.OS === 'ios') {
        startForegroundTracking();
      } else {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
          switch (nextAppState) {
            case 'active':
              withAndroidTrackingInBackground && stopBackgroundTracking();
              startForegroundTracking();
              break;
            case 'inactive':
            case 'background':
              withAndroidTrackingInBackground && startBackgroundTracking();
              stopForegroundTracking();
              break;
            default:
              break;
          }

          appState.current = nextAppState;
        };

        handleAppStateChange(AppState.currentState);
        subscription = AppState.addEventListener('change', handleAppStateChange);
      }
    }

    return () => {
      subscription?.remove();
      stopForegroundTracking();
      Platform.OS === 'android' && withAndroidTrackingInBackground && stopBackgroundTracking();
    };
  }, [
    accuracy,
    isLocationEnabled,
    isPermissionGranted,
    startBackgroundTracking,
    startForegroundTracking,
    stopBackgroundTracking,
    stopForegroundTracking,
    withAndroidTrackingInBackground,
  ]);
};

export {
  degToRad,
  EARTH_RADIUS_IN_METERS,
  getAngleBetweenPoints,
  getDistanceBetweenPoints,
  radToDeg,
  useGeolocationStartWatch,
};
