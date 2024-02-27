import { type StyleProp, type ViewStyle } from 'react-native';

export type GroupedButtonsProps = {
  width: number;
  isFirstButtonSelected: boolean;
  setIsFirstButtonSelected: (arg0: boolean) => void;
  firstButtonText: string;
  secondButtonText: string;
  style?: StyleProp<ViewStyle>;
};
