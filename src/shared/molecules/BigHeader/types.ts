import { type StyleProp, type ViewStyle } from 'react-native';

export type BigHeaderProps = {
  windowTitle?: string;
  firstHeaderTitle: string;
  secondHeaderTitle?: string;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
  headerInOneLine?: boolean;
};
