import { type CurrencyType } from './types';

const currencySignData: Record<CurrencyType, string> = {
  USD: '$',
  UAH: '₴',
};

export const getCurrencySign = (currencyCode: CurrencyType) => currencySignData[currencyCode];
