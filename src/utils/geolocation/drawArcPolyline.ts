import { type LatLng } from 'react-native-maps';

import { degToRad, EARTH_RADIUS_IN_METERS, radToDeg } from '.';

const computeDistance = (startLocation: LatLng, endLocation: LatLng) => {
  const hav = (num: number) => {
    const sinHalf = Math.sin(num * 0.5);
    return sinHalf * sinHalf;
  };

  const havDistance = (lat1: number, lat2: number, deltaLng: number) => {
    return hav(lat1 - lat2) + hav(deltaLng) * Math.cos(lat1) * Math.cos(lat2);
  };

  return (
    2 *
    Math.asin(
      Math.sqrt(
        havDistance(
          degToRad(startLocation.latitude),
          degToRad(endLocation.latitude),
          degToRad(startLocation.longitude) - degToRad(endLocation.longitude),
        ),
      ),
    ) *
    EARTH_RADIUS_IN_METERS
  );
};

const computeHeading = (startLocation: LatLng, endLocation: LatLng) => {
  const fromLat = degToRad(startLocation.latitude);
  const fromLng = degToRad(startLocation.longitude);
  const toLat = degToRad(endLocation.latitude);
  const toLng = degToRad(endLocation.longitude);
  const dLng = toLng - fromLng;
  const heading = Math.atan2(
    Math.sin(dLng) * Math.cos(toLat),
    Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(dLng),
  );

  const wrap = (n: number, min: number, max: number) => {
    const mod = (x: number, m: number) => ((x % m) + m) % m;

    return n >= min && n < max ? n : mod(n - min, max - min) + min;
  };

  return wrap(radToDeg(heading), -180, 180);
};

const computeOffset = (startLocation: LatLng, distance: number, heading: number): LatLng => {
  const d = distance / EARTH_RADIUS_IN_METERS;
  const h = degToRad(heading);
  const startLatRad = degToRad(startLocation.latitude);
  const startLngRad = degToRad(startLocation.longitude);
  const cosDistance = Math.cos(d);
  const sinDistance = Math.sin(d);
  const sinStartLatRad = Math.sin(startLatRad);
  const cosStartLatRad = Math.cos(startLatRad);
  const sinLat = cosDistance * sinStartLatRad + sinDistance * cosStartLatRad * Math.cos(h);
  const dLng = Math.atan2(sinDistance * cosStartLatRad * Math.sin(h), cosDistance - sinStartLatRad * sinLat);

  return { latitude: radToDeg(Math.asin(sinLat)), longitude: radToDeg(startLngRad + dLng) };
};

const getDirection = (startLocation: LatLng, endLocation: LatLng) => {
  let radians = Math.atan2(
    endLocation.longitude - startLocation.longitude,
    endLocation.latitude - startLocation.latitude,
  );
  if (radians < 0) {
    radians = radians + 2 * Math.PI;
  }

  const val = Math.floor(radToDeg(radians) / 22.5 + 0.5);
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return directions[val % 16];
};

const drawArcPolyline = (startLocation: LatLng, endLocation: LatLng) => {
  // Curve line - set this between 0.2 to 0.5 for better results
  const curveLine = 0.3;

  const distance = computeDistance(startLocation, endLocation);
  const heading = computeHeading(startLocation, endLocation);

  // Calculate the midpoint
  const p = computeOffset(startLocation, distance * 0.5, heading);

  // Calcualte the position of the circle center
  const x = ((1 - curveLine * curveLine) * distance * 0.5) / (2 * curveLine);
  const r = ((1 + curveLine * curveLine) * distance * 0.5) / (2 * curveLine);
  const direction = getDirection(startLocation, endLocation);
  const angle =
    direction === 'W' || direction === 'NW' || direction === 'WNW' || direction === 'SW' || direction === 'WSW'
      ? -90
      : 90;
  const c = computeOffset(p, x, heading + angle);

  // Calculate the heading between center of the circle and two points
  const headingStart = computeHeading(c, startLocation);
  const headingEnd = computeHeading(c, endLocation);

  const numpoints = 50;
  const step = (headingEnd - headingStart) / numpoints;

  const result: LatLng[] = [];

  for (let i = 0; i < numpoints; i++) {
    result.push(computeOffset(c, r, headingStart + i * step));
  }
  result.push(endLocation);

  return result;
};

export { drawArcPolyline };
