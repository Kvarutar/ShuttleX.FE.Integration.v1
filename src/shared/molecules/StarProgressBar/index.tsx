import MaskedView from '@react-native-masked-view/masked-view';
import { type DimensionValue, StyleSheet, View } from 'react-native';
import { useTheme } from 'shuttlex-integration';

import Star2Icon from '../../icons/Star2Icon';
import { type StarProgressBarProps } from './types';

const StarProgressBar = ({
  fillColor,
  backgroundColor,
  sizeMultiply = 1,
  starsAmount = 5,
  mark,
}: StarProgressBarProps) => {
  const { colors } = useTheme();

  const fillLocalColor = fillColor ?? colors.primaryColor;
  const backgroundLocalColor = backgroundColor ?? '#D9D9D9';
  const percentage: DimensionValue = mark ? `${Math.floor((mark / starsAmount) * 100)}%` : '0%';

  const starHeight = 22 * sizeMultiply;
  const starWidth = 23 * sizeMultiply;

  const computedStyles = StyleSheet.create({
    maskedView: {
      height: starHeight,
      width: starWidth * starsAmount,
    },
    fill: {
      backgroundColor: fillLocalColor,
      width: percentage,
    },
    background: {
      backgroundColor: backgroundLocalColor,
    },
    icon: {
      height: starHeight,
      width: starWidth,
    },
  });

  return (
    <MaskedView
      style={[styles.flexDirRow, computedStyles.maskedView]}
      maskElement={
        <View style={styles.flexDirRow}>
          {[...Array(starsAmount)].map((_, index) => (
            <Star2Icon key={index} style={computedStyles.icon} />
          ))}
        </View>
      }
    >
      <View style={computedStyles.fill} />
      <View style={[styles.background, computedStyles.background]} />
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  flexDirRow: {
    flexDirection: 'row',
  },
  background: {
    flex: 1,
  },
});

export default StarProgressBar;
