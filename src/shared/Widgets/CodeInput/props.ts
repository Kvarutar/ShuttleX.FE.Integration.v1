import { type StyleProp, type ViewStyle } from 'react-native';

import { type TextInputProps } from '../../BrandBook/TextInput/props';

export type CodeInputProps = {
  style?: StyleProp<ViewStyle>;
  onCodeChange: (text: string) => void;
};

export type CodeNumberProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onKeyPress?: TextInputProps['onKeyPress'];
};
