import React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import BrandFavIcon from './BrandBook/Icons/BrandFavIcon';
import BrandTextIcon from './BrandBook/Icons/BrandTextIcon';

const GroupedBrandIcon = ({ style, iconColor }: { style?: StyleProp<ViewStyle>; iconColor?: string }): JSX.Element => (
  <View style={[styles.GroupedBrandIcon, style]}>
    <BrandFavIcon color={iconColor} />
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
