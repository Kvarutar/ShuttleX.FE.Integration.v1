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
 * Converts boolean to number 1 or -1
 * @param flag boolean value
 * @returns number 1 or -1
 */
const boolToSign = (flag: boolean) => (flag ? 1 : -1);

export { boolToSign, degToRad, radToDeg };
