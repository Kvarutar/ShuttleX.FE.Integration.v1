import { type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native';

import { type PaymentMethod } from '../../../utils/payment/types';

export type PaymentBarProps = {
  style?: StyleProp<ViewStyle>;
  method: PaymentMethod;
  title: string;
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  squareShape?: boolean;
  addMethodStyle?: boolean;
  expiredText?: string;
};
