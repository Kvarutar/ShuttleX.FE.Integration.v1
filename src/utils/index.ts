import { getLocales } from 'react-native-localize';
/**
 * Converts boolean to number 1 or -1
 * @param flag boolean value
 * @returns number 1 or -1
 */
const boolToSign = (flag: boolean) => (flag ? 1 : -1);

/**
 * Converts minutes to milliseconds
 * @param time value in minutes
 * @returns milliseconds
 */
const minToMilSec = (minutes: number) => minutes * 60 * 1000;

/**
 * Converts seconds to milliseconds
 * @param time value in seconds
 * @returns milliseconds
 */
const secToMilSec = (seconds: number) => seconds * 1000;

/**
 * Converts milliseconds to minutes or hours if minutes > 60
 * @param time value in milliseconds
 * @returns minutes or hours
 */
const milSecToTime = (milliseconds: number): number => {
  const minutes = milliseconds / 60000;

  if (minutes > 60) {
    return minutes / 60;
  }

  return minutes;
};

/**
 * Converts milliseconds to minutes
 * @param milliseconds value in milliseconds
 * @returns minutes
 */
const milSecToMin = (milliseconds: number): number => {
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

  return minutes;
};

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

/**
 * Converts phone number to only format
 * @param phone value
 * @returns +12345678900 format
 */
const formatPhone = (phone: string) => {
  return phone.replace(/[^+\d]/g, '');
};

export { boolToSign, formatDate, formatPhone, milSecToMin, milSecToTime, minToMilSec, secToMilSec };
