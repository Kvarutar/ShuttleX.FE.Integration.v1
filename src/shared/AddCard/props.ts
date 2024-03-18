import { type CreditCardType } from 'credit-card-type/dist/types';

export type Card = {
  number: string;
  expiresAt: string;
  code: string;
  type: CreditCardType['type'] | null;
};

export type AddCardProps = {
  onCardSave: (cardData: Card) => void;
  onBackButtonPress: () => void;
};
