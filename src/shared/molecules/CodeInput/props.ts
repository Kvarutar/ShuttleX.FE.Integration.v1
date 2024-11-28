import { type StyleProp, type ViewStyle } from 'react-native';

export type CodeInputProps = {
  style?: StyleProp<ViewStyle>;
  isError?: boolean;
  onCodeChange: (text: string) => void;
};

export type CodeInputRef = {
  cleanFields: () => void;
};

export type CodeNumberProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onBackspaceKeyPress?: () => void;
  isError?: boolean;
};
