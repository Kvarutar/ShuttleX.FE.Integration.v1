import { type StyleProp, type ViewStyle } from 'react-native';

export type PopupProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  bottomWindowStyle?: StyleProp<ViewStyle>;
  isWithBlur?: boolean;
  onCloseButtonPress?: () => void;
  onBackButtonPress?: () => void;
};
