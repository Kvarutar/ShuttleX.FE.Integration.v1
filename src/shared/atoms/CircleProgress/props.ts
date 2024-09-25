import { type StyleProp, type ViewStyle } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

export type AnimatedLineComponentProps = {
  progressAngle: Readonly<SharedValue<number>>;
  markAngle: number;
  marksColorFilled: string;
  marksColorNotFilled: string;
  marksWidth: number;
  marksHeight: number;
  radius: number;
  index: number;
  size: number;
};

export type CircularProps = {
  size?: number;
  completionPercentage: number;
  marksWidth?: number;
  marksHeight?: number;
  padding?: number;
  marksColorFilled?: string;
  marksColorNotFilled?: string;
  children?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  animationDuration?: number;
};
