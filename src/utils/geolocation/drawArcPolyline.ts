import { type LatLng } from 'react-native-maps';

import { getAngleBetweenPoints } from '.';

const arcHeight = 0.8;
const numPoints = 100;

function quadraticBezierCurve(startPoint: LatLng, endPoint: LatLng, controlPoint: LatLng) {
  const points: LatLng[] = [];
  const step = 1 / (numPoints - 1);

  for (let t = 0; t <= 1; t += step) {
    const x = (1 - t) ** 2 * startPoint.latitude + 2 * (1 - t) * t * controlPoint.latitude + t ** 2 * endPoint.latitude;
    const y =
      (1 - t) ** 2 * startPoint.longitude + 2 * (1 - t) * t * controlPoint.longitude + t ** 2 * endPoint.longitude;
    const coord = { latitude: x, longitude: y };
    points.push(coord);
  }

  return points;
}

const calculateControlPoint = (startPoint: LatLng, endPoint: LatLng): LatLng => {
  const latitdudeDelta = endPoint.latitude - startPoint.latitude;
  const longitudeDelta = endPoint.longitude - startPoint.longitude;

  const d = Math.sqrt(latitdudeDelta ** 2 + longitudeDelta ** 2);
  const h = d * arcHeight;

  const angle = getAngleBetweenPoints(startPoint, endPoint);
  let w = d / 2;
  if (angle > 180 && angle < 360) {
    w *= -1;
  }

  const x_m = (startPoint.latitude + endPoint.latitude) / 2;
  const y_m = (startPoint.longitude + endPoint.longitude) / 2;
  const x_c = x_m + ((h * longitudeDelta) / (2 * Math.sqrt(latitdudeDelta ** 2 + longitudeDelta ** 2))) * (w / d);
  const y_c = y_m - ((h * latitdudeDelta) / (2 * Math.sqrt(latitdudeDelta ** 2 + longitudeDelta ** 2))) * (w / d);

  return { latitude: x_c, longitude: y_c };
};

const drawArcPolyline = (startPoint: LatLng, endPoint: LatLng) => {
  const controlPoint = calculateControlPoint(startPoint, endPoint);
  return quadraticBezierCurve(startPoint, endPoint, controlPoint);
};

export { drawArcPolyline };
