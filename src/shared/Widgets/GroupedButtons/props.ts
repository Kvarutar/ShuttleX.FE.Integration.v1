import { type StyleProp, type ViewStyle } from 'react-native';

export type GroupedButtonsProps = {
  style?: StyleProp<ViewStyle>;
  isFirstSelectedButton: boolean;
  setIsFirstSelectedButton: React.Dispatch<React.SetStateAction<boolean>>;
  firstTextButton: string;
  secondTextButton: string;
};
