import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import BrandFavIcon from './BrandFavIcon';
import BrandTextIcon from './BrandTextIcon';

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
