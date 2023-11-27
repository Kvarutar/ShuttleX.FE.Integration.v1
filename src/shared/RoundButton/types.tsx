import { type StyleProp, type ViewStyle } from 'react-native';

export type RoundButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
