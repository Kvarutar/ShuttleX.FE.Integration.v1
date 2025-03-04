import { decode } from '@googlemaps/polyline-codec';
import { type LatLng } from 'react-native-maps';

import { getDistanceBetweenPoints } from '../../utils/geolocation';
import { mapConstants } from './MapView';

/**
 * Calculates a new route by deleting points that exceed the thresholdDistance from the point to currentCoordinates
 * @param routePoints
 * @param currentCoordinates
 * @param thresholdDistance distance in meters
 * @returns new route points array (from nearest point to last point)
 */
export const calculateNewMapRoute = (
  routePoints: LatLng[],
  currentCoordinates: LatLng,
  thresholdDistance: number,
): LatLng[] => {
  let nearestPointIndex = -1;
  let nearestPointDistance = Infinity;

  routePoints.forEach((point, index) => {
    const distance = getDistanceBetweenPoints(currentCoordinates, point);
    if (distance < nearestPointDistance) {
      nearestPointDistance = distance;
      nearestPointIndex = index;
    }
  });

  if (nearestPointDistance < thresholdDistance) {
    return routePoints.slice(nearestPointIndex);
  }
  return routePoints;
};

export const decodeGooglePolyline = (encodedGeometry: string): LatLng[] => {
  return decode(encodedGeometry, 6).map(([latitude, longitude]) => ({ latitude, longitude }));
};

export const decodeGooglePolylineArr = (encodedGeometries: string[]): LatLng[] => {
  const res: LatLng[] = [];
  encodedGeometries.forEach(geometry => res.push(...decodeGooglePolyline(geometry)));
  return res;
};

/**
 * Converts number to number by zoom level
 * @returns converted number by zoom level
 */
export const scaleNumberByZoomLevel = (zoomLevel: number, numberForScaling: number) => {
  const scaleFactor = Math.pow(1.2, zoomLevel - mapConstants.cameraZoom);
  const result = numberForScaling * scaleFactor;
  return result > 250 ? 250 : result;
};

export const getDeltasFromZoomAndLatitude = (latitude: number, zoom: number) => {
  const latitudeDelta = 360 / Math.pow(2, zoom);
  const longitudeDelta = latitudeDelta / Math.cos((latitude * Math.PI) / 180);

  return { latitudeDelta, longitudeDelta };
};

export const isCoordinatesEqualZero = (coordinates: LatLng) =>
  coordinates.latitude === 0 && coordinates.longitude === 0;
