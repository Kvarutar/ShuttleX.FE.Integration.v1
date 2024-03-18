import { type CreditCardType } from 'credit-card-type/dist/types';

export type PaymentMethod = {
  method: CreditCardType['type'];
  details: string;
};
