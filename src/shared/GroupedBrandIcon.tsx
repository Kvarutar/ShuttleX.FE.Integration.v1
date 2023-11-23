import React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import BrandFavIcon from './BrandBook/Icons/BrandFavIcon';
import BrandTextIcon from './BrandBook/Icons/BrandTextIcon';

const GroupedBrandIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
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
