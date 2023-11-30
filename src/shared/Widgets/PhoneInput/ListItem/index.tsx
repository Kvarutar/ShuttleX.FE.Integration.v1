import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BackIcon } from '../../../BrandBook/Icons';
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
      {withArrow && <BackIcon style={styles.backIcon} />}
    </View>
    <Text style={styles.codePhone}>{`+${icc}`}</Text>
    <Text style={styles.labelPhone}>{countryName}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  flagContainer: {
    width: 89,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  codePhone: {
    width: 70,
    lineHeight: 19,
  },
  labelPhone: {
    flex: 1,
    lineHeight: 19,
  },
  backIcon: {
    transform: [{ rotate: '90deg' }, { translateX: 1 }],
  },
});

export default ListItem;
