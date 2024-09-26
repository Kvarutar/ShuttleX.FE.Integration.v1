import { type StyleProp, type ViewStyle } from 'react-native';

export type UnclosablePopupProps = {
  subTitle?: string;
  title?: string;
  secondTitle?: string;
  description?: string;
  bottomAdditionalContent?: React.ReactNode;
  bottomWindowStyle?: StyleProp<ViewStyle>;
};
