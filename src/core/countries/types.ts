import { type countryFlags } from '../../shared/icons/Flags';

export type CountryPhoneMaskDto = {
  countryCode: keyof typeof countryFlags;
  countryName: string;
  phoneMask: string;
  icc: string;
};
