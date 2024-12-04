import { StyleSheet, View } from 'react-native';
import ReanimatedSkeleton from 'react-native-reanimated-skeleton';

import { useTheme } from '../../../core/themes/v2/themeContext';
import { type SkeletonProps } from './types';

const Skeleton = ({
  isLoading = true,
  skeletonsAmount = 1,
  skeletonContainerStyle,
  boneColor,
  highlightColor,
}: SkeletonProps) => {
  const { colors } = useTheme();

  const skeletonBoneColor = boneColor ?? colors.skeletonBoneColor;
  const skeletonHighlightColor = highlightColor ?? colors.skeletonHighlightColor;

  return skeletonsAmount === 1 ? (
    <ReanimatedSkeleton
      isLoading={isLoading}
      boneColor={skeletonBoneColor}
      highlightColor={skeletonHighlightColor}
      containerStyle={[styles.skeletonContainerStyle, skeletonContainerStyle]}
    >
      <View style={styles.skeletonItemStyle} />
    </ReanimatedSkeleton>
  ) : (
    Array.from({ length: skeletonsAmount }).map((_, index: number) => (
      <ReanimatedSkeleton
        key={index}
        isLoading={isLoading}
        boneColor={skeletonBoneColor}
        highlightColor={skeletonHighlightColor}
        containerStyle={[styles.skeletonContainerStyle, skeletonContainerStyle]}
      >
        <View key={index} style={styles.skeletonItemStyle} />
      </ReanimatedSkeleton>
    ))
  );
};

const styles = StyleSheet.create({
  skeletonContainerStyle: {
    overflow: 'hidden',
  },
  skeletonItemStyle: {
    width: '100%',
    height: '100%',
  },
});

export default Skeleton;
