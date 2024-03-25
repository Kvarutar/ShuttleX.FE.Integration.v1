/**
 * Сonverts degrees to radians
 * @param deg angle value in degrees
 * @returns angle value in radians
 */
const degToRad = (deg: number) => {
  return (deg * Math.PI) / 180;
};

/**
 * Сonverts radians to degrees
 * @param rad angle value in radians
 * @returns angle value in degrees
 */
const radToDeg = (rad: number) => {
  return rad * (180 / Math.PI);
};

export { degToRad, radToDeg };
