import { type StyleProp, type ViewStyle } from 'react-native';

export type SkeletonProps = {
  isLoading?: boolean;
  skeletonsAmount?: number;
  skeletonContainerStyle?: StyleProp<ViewStyle>;
  boneColor?: string;
  highlightColor?: string;
};
