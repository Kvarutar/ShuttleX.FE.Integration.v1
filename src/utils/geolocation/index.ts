import { useEffect, useRef, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import { type LatLng } from 'react-native-maps';
import { type LocationAccuracy } from 'react-native-permissions';

import { checkGeolocationPermissionAndAccuracy, requestGeolocationPermission } from '../permissions';
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

const useGeolocationStartWatch = ({
  onLocationEnabledChange,
  onPermissionGrantedChange,
  onAccuracyChange,
  onCoordinatesChange,
  onError,
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
        const res = await checkGeolocationPermissionAndAccuracy();
        changeIsPermissionGranted(res.isGranted);
        changeAccuracy(res.accuracy);
      }
    };

    (async () => {
      await requestGeolocationPermission();
      await checks();
      setInterval(checks, geolocationConsts.checkInterval);
    })();
  }, []);

  useEffect(() => {
    if (isLocationEnabled && isPermissionGranted === true && accuracy === 'full') {
      watchId.current = Geolocation.watchPosition(
        position => onCoordinatesChangeRef.current?.(position.coords),
        err => onErrorRef.current?.(err),
        {
          accuracy: { android: 'high', ios: 'best' },
          distanceFilter: 1,
          interval: geolocationConsts.updateInterval,
          fastestInterval: geolocationConsts.updateInterval,
        },
      );
    } else if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, [isLocationEnabled, isPermissionGranted, accuracy]);
};

export {
  degToRad,
  EARTH_RADIUS_IN_METERS,
  getAngleBetweenPoints,
  getDistanceBetweenPoints,
  radToDeg,
  useGeolocationStartWatch,
};
