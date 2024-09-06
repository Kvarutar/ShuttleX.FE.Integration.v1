/**
 * Converts boolean to number 1 or -1
 * @param flag boolean value
 * @returns number 1 or -1
 */
const boolToSign = (flag: boolean) => (flag ? 1 : -1);

/**
 * Converts minutes to milliseconds
 * @param time value in seconds
 * @returns milliseconds
 */
const minToMilSec = (time: number) => time * 60 * 1000;

export { boolToSign, minToMilSec };
