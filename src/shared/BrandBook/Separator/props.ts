import { type StyleProp, type ViewStyle } from 'react-native';

type SeaparatorMode = 'horizontal' | 'vertical';

export type SeparatorProps = {
  style?: StyleProp<ViewStyle>;
  mode?: SeaparatorMode;
};
