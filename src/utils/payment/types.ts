import { type CreditCardType } from 'credit-card-type/dist/types';
import { type StyleProp, type ViewStyle } from 'react-native';

export type PaymentMethod = {
  method: CreditCardType['type'];
  details: string;
  expiresAt: string;
};

export type IconProps = {
  style?: StyleProp<ViewStyle>;
  color?: string;
};
