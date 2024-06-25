import { type StyleProp, type ViewStyle } from 'react-native';

import { type countryDtosProps } from '../../../core/countries/props';

export type PhoneInputProps = {
  style?: StyleProp<ViewStyle>;
  getPhoneNumber: (phoneNumber: string | null) => void;
  onFlagPress: () => void;
  flagState: countryDtosProps;
  error?: { isError: boolean; message: string };
};
