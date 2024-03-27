import React from 'react';
import { Image, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import MenuUserImageLineIcon from '../icons/MenuUserImageLineIcon';

const MenuUserImage = ({ url, style }: { url: string; style?: StyleProp<ViewStyle> }) => (
  <View style={[styles.wrapper, style]}>
    <MenuUserImageLineIcon style={styles.line} />
    <Image style={styles.image} source={{ uri: url }} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: 72,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 17,
    objectFit: 'cover',
  },
  line: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default MenuUserImage;
