import React from 'react';
import { StyleSheet, View } from 'react-native';

import { type StyleProps } from '../utils/react-native-props';
import BrandFavIcon from './BrandBook/Icons/BrandFavIcon';
import BrandTextIcon from './BrandBook/Icons/BrandTextIcon';

const GroupedBrandIcon = ({ style }: StyleProps): JSX.Element => (
  <View style={[styles.GroupedBrandIcon, style]}>
    <BrandFavIcon />
    <BrandTextIcon />
  </View>
);

const styles = StyleSheet.create({
  GroupedBrandIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
});

export default GroupedBrandIcon;
