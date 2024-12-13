import { decode } from '@googlemaps/polyline-codec';
import { type LatLng } from 'react-native-maps';

import { getDistanceBetweenPoints } from '../../utils/geolocation';

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
  return decode(encodedGeometry).map(([latitude, longitude]) => ({ latitude, longitude }));
};

export const isCoordinatesEqualZero = (coordinates: LatLng) =>
  coordinates.latitude === 0 && coordinates.longitude === 0;
