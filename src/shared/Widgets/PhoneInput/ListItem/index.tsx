import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import ArrowIcon from '../../../BrandBook/Icons/ArrowIcon';
import Text from '../../../BrandBook/Text';
import { type ListItemProps } from './props';

const ListItem = ({
  iconSvg,
  icc,
  countryName,
  style,
  withArrow,
  onFlagContainerPress,
}: ListItemProps): JSX.Element => (
  <Pressable style={[styles.container, style]} onPress={onFlagContainerPress}>
    <View style={[styles.flagContainer]}>
      {iconSvg}
      {withArrow && <ArrowIcon style={styles.arrowIcon} />}
    </View>
    <Text style={styles.codePhone}>{`+${icc}`}</Text>
    <Text style={styles.labelPhone}>{countryName}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  flagContainer: {
    width: 89,
    flexDirection: 'row',
    gap: 8,
  },
  codePhone: {
    width: 70,
    lineHeight: 19,
  },
  labelPhone: {
    flex: 1,
    lineHeight: 19,
  },
  arrowIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

export default ListItem;
