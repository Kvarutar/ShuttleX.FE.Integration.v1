import { getLocales } from 'react-native-localize';
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

/**
 * Converts date to normal format
 * @param date value
 * @returns d/m/y format
 */
const formatDate = (date: Date): string => {
  const langCode = getLocales()[0]?.languageCode;

  return date.toLocaleDateString(langCode, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

export { boolToSign, formatDate, minToMilSec };
