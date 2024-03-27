import { type StyleProp, type ViewStyle } from 'react-native';

export type CodeInputProps = {
  style?: StyleProp<ViewStyle>;
  onCodeChange: (text: string) => void;
};

export type CodeNumberProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onBackspaceKeyPress?: () => void;
};
