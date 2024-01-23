import { type StyleProp, type ViewStyle } from 'react-native';

export type PhoneInputProps = {
  style?: StyleProp<ViewStyle>;
  getPhoneNumber: (phoneNumber: string | null) => void;
};
