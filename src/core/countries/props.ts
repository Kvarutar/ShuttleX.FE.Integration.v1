import { type countryFlags } from '../../shared/icons/Flags';

export type countryDtosProps = {
  countryCode: keyof typeof countryFlags;
  countryCodeIso: string;
  countryName: string;
  currency: string;
  phoneMask: string;
  icc: number;
  iccPrefix?: number;
  prefix?: number;
  size: number;
};
