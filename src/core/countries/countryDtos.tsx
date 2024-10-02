import { type CountryPhoneMaskDto } from 'shuttlex-integration';

export const countryDtos: CountryPhoneMaskDto[] = [
  {
    countryName: 'Austria',
    icc: '+43',
    countryCode: 'AT',
    phoneMask: '(###)###-####',
  },
  {
    countryName: 'Belgium',
    icc: '+32',
    countryCode: 'BE',
    phoneMask: '(###)###-###',
  },
  {
    countryName: 'Brazil',
    icc: '+55',
    countryCode: 'BR',
    phoneMask: '(##)####-####',
  },
  {
    countryName: 'Bulgaria',
    icc: '+359',
    countryCode: 'BG',
    phoneMask: '(###)###-###',
  },
  {
    countryName: 'Canada',
    icc: '+1',
    countryCode: 'CA',
    phoneMask: '(###)###-####',
  },
  {
    countryName: 'Croatia',
    icc: '+385',
    countryCode: 'HR',
    phoneMask: '##-###-###',
  },
  {
    countryName: 'Czech Republic',
    icc: '+420',
    countryCode: 'CZ',
    phoneMask: '(###)###-###',
  },
  {
    countryName: 'Denmark',
    icc: '+45',
    countryCode: 'DK',
    phoneMask: '##-##-##-##',
  },
  {
    countryName: 'Egypt',
    icc: '+20',
    countryCode: 'EG',
    phoneMask: '(###)###-####',
  },
  {
    countryName: 'Estonia',
    icc: '+372',
    countryCode: 'EE',
    phoneMask: '####-####',
  },
  {
    countryName: 'Finland',
    icc: '+358',
    countryCode: 'FI',
    phoneMask: '(###)###-##-##',
  },
  {
    countryName: 'France',
    icc: '+33',
    countryCode: 'FR',
    phoneMask: '(###)###-###',
  },
  {
    countryName: 'Germany',
    icc: '+49',
    countryCode: 'DE',
    phoneMask: '(####)###-####',
  },
  {
    countryName: 'Greece',
    icc: '+30',
    countryCode: 'GR',
    phoneMask: '(###)###-####',
  },
  {
    countryName: 'Hungary',
    icc: '+36',
    countryCode: 'HU',
    phoneMask: '(###)###-###',
  },
  {
    countryName: 'Italy',
    icc: '+39',
    countryCode: 'IT',
    phoneMask: '(###)####-###',
  },
  {
    countryName: 'Latvia',
    icc: '+371',
    countryCode: 'LV',
    phoneMask: '##-###-###',
  },
  {
    countryName: 'Lithuania',
    icc: '+370',
    countryCode: 'LT',
    phoneMask: '(###)##-###',
  },
  {
    countryName: 'Maldives',
    icc: '+960',
    countryCode: 'MV',
    phoneMask: '###-####',
  },
  {
    countryName: 'Mexico',
    icc: '+52',
    countryCode: 'MX',
    phoneMask: '(###)###-####',
  },
  {
    countryName: 'Netherlands',
    icc: '+31',
    countryCode: 'NL',
    phoneMask: '##-###-####',
  },
  {
    countryName: 'Norway',
    icc: '+47',
    countryCode: 'NO',
    phoneMask: '(###)##-###',
  },
  {
    countryName: 'Poland',
    icc: '+48',
    countryCode: 'PL',
    phoneMask: '(###)###-###',
  },
  {
    countryName: 'Portugal',
    icc: '+351',
    countryCode: 'PT',
    phoneMask: '##-###-####',
  },
  {
    countryName: 'Romania',
    icc: '+40',
    countryCode: 'RO',
    phoneMask: '##-###-####',
  },
  {
    countryName: 'Saudi Arabia',
    icc: '+966',
    countryCode: 'SA',
    phoneMask: '#-###-####',
  },
  {
    countryName: 'Serbia',
    icc: '+381',
    countryCode: 'RS',
    phoneMask: '##-###-####',
  },
  {
    countryName: 'Slovakia',
    icc: '+421',
    countryCode: 'SK',
    phoneMask: '(###)###-###',
  },
  {
    countryName: 'Slovenia',
    icc: '+386',
    countryCode: 'SI',
    phoneMask: '##-###-###',
  },
  {
    countryName: 'Spain',
    icc: '+34',
    countryCode: 'ES',
    phoneMask: '(###)###-###',
  },
  {
    countryName: 'Sweden',
    icc: '+46',
    countryCode: 'SE',
    phoneMask: '##-###-####',
  },
  {
    countryName: 'Switzerland',
    icc: '+41',
    countryCode: 'CH',
    phoneMask: '##-###-####',
  },
  {
    countryName: 'Turkey',
    icc: '+90',
    countryCode: 'TR',
    phoneMask: '(###)###-####',
  },
  {
    countryName: 'Ukraine',
    icc: '+380',
    countryCode: 'UA',
    phoneMask: '(##)###-##-##',
  },
  {
    countryName: 'United Kingdom',
    icc: '+44',
    countryCode: 'GB',
    phoneMask: '##-####-####',
  },
  {
    countryName: 'United States',
    icc: '+1',
    countryCode: 'US',
    phoneMask: '(###)###-####',
  },
];

export const getCountryPhoneMaskByCountryName = (countryName: string) => {
  return countryDtos.find(elem => elem.countryName.toLowerCase() === countryName.toLowerCase());
};
