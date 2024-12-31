import { Linking } from 'react-native';
import { getLocales } from 'react-native-localize';
import { type LatLng } from 'react-native-maps';

import i18nIntegration from '../core/locales/i18n';
import { indexOfNotFound } from '../core/monkey-patch/array.helper';
/**
 * Converts boolean to number 1 or -1
 * @param flag boolean value
 * @returns number 1 or -1
 */
const boolToSign = (flag: boolean) => (flag ? 1 : -1);

/**
 * Converts minutes to milliseconds
 * @param minutes
 * @returns milliseconds
 */
const minToMilSec = (minutes: number) => minutes * 60 * 1000;

/**
 * Converts seconds to milliseconds
 * @param seconds
 * @returns milliseconds
 */
const secToMilSec = (seconds: number) => seconds * 1000;

/**
 * Converts milliseconds to minutes or hours if minutes > 60
 * @param milliseconds
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
 * @param milliseconds
 * @returns minutes
 */
const milSecToMin = (milliseconds: number): number => {
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

  return minutes;
};

/**
 * Converts milliseconds to hours
 * @param milliseconds
 * @returns hours
 */
const milSecToHours = (milliseconds: number): number => {
  const minutes = milliseconds / 60000;

  if (minutes > 60) {
    return minutes / 60;
  } else {
    return 0;
  }
};

const getTimezoneOffsetInMilSec = () => -new Date().getTimezoneOffset() * 60000;

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

const formatTime = (time: Date): string =>
  time
    .toLocaleTimeString(getLocales()[0]?.languageTag, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/^0/, '');

/**
 * Converts total amount of seconds to seconds/hours/minutes with correlating label
 * @param seconds
 * @returns value in seconds/hours/minutes with correlating label
 */
const getTimeWithAbbreviation = (seconds: number): { value: string; label: string } => {
  const t = i18nIntegration.t;
  const minutes = Math.floor(seconds / 60);

  if (seconds < 60) {
    return { value: seconds.toString(), label: t('seconds_abbrev') };
  }
  if (minutes < 60) {
    return { value: minutes.toString(), label: t('minutes_abbrev') };
  }
  return { value: Math.floor(minutes / 60).toString(), label: t('hours_abbrev') };
};

/**
 * Converts phone number to only format
 * @param phone value
 * @returns +12345678900 format
 */
const formatPhone = (phone: string) => {
  return phone.replace(/[^+\d]/g, '');
};

/**
 * Converts phone number to format with brackets
 * @param numbers value
 * @param mask value
 * @returns +123(45)678-90-06 format
 */
const formatNumbersToMask = (numbers: string, mask: string): string => {
  const numbersArr = numbers.split('');
  const maskArr = mask.split('');

  for (const number of numbersArr) {
    const hashPosition = maskArr.indexOf('#');
    if (hashPosition === indexOfNotFound) {
      break;
    }
    maskArr[hashPosition] = number;
  }

  const hashPosition = maskArr.indexOf('#');
  // Check if there is hash sign left
  if (hashPosition === -1) {
    return maskArr.join('');
  }
  return maskArr.slice(0, hashPosition).join('');
};

/**
 * Converts metres to kilometres
 * @param distance value
 * @returns 10.7 format
 */
const mtrToKm = (distance: number) => {
  return parseFloat((distance / 1000).toFixed(1));
};

const openRouteOnGoogleMaps = (startPoint: LatLng, endPoint: LatLng) => {
  Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=${startPoint.latitude},${startPoint.longitude}&destination=${endPoint.latitude},${endPoint.longitude}`,
  );
};

export {
  boolToSign,
  formatDate,
  formatNumbersToMask,
  formatPhone,
  formatTime,
  getTimeWithAbbreviation,
  getTimezoneOffsetInMilSec,
  milSecToHours,
  milSecToMin,
  milSecToTime,
  minToMilSec,
  mtrToKm,
  openRouteOnGoogleMaps,
  secToMilSec,
};
