import { getLocales } from 'react-native-localize';

import { type CurrencyType } from './types';

const currencySignData: Record<CurrencyType, string> = {
  USD: '$',
  UAH: '₴',
  AED: 'AED',
};

export const formatCurrency = (currencyCode: string, amount: number) => {
  return new Intl.NumberFormat(getLocales()[0]?.languageCode, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getCurrencySign = (currencyCode: CurrencyType) => currencySignData[currencyCode];
