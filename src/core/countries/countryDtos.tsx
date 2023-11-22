import { type countryDtosProps } from './props';

export const countryDtos: countryDtosProps[] = [
  {
    countryCode: 'US',
    countryCodeIso: 'USA',
    countryName: 'United States',
    currency: 'USD',
    icc: 1,
    size: 10,
    phoneMask: '+1(###)###-####',
  },
  {
    countryCode: 'BY',
    countryCodeIso: 'BLR',
    countryName: 'Belarus',
    currency: 'BYN',
    icc: 375,
    size: 9,
    phoneMask: '+375(##)###-##-##',
  },
  {
    countryCode: 'UA',
    countryCodeIso: 'UKR',
    countryName: 'Ukraine',
    currency: 'UAH',
    icc: 380,
    size: 10,
    phoneMask: '+380(##)###-##-##',
  },
  {
    countryCode: 'DE',
    countryCodeIso: 'DEU',
    countryName: 'Germany',
    currency: 'EUR',
    icc: 49,
    size: 6,
    phoneMask: '+49-###-###',
  },
  {
    countryCode: 'FI',
    countryCodeIso: 'FIN',
    countryName: 'Finland',
    currency: 'EUR',
    icc: 358,
    size: 10,
    phoneMask: '+358(###)###-##-##',
  },
];
