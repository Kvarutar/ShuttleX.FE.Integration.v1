import { type StyleProp, type ViewStyle } from 'react-native';

import { type CountryPhoneMaskDto } from '../../../core/countries/types';

export type PhoneInputProps = {
  style?: StyleProp<ViewStyle>;
  getPhoneNumber: (phoneNumber: string) => void;
  onFlagPress: () => void;
  flagState: CountryPhoneMaskDto;
  error?: { isError: boolean; message?: string };
};
