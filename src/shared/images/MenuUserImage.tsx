import { Image, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import EmojiIcon from '../icons/EmojiIcon';

const MenuUserImage = ({ url, style }: { url?: string; style?: StyleProp<ViewStyle> }) => (
  <View style={[styles.wrapper, style]}>
    {url ? <Image style={styles.image} source={{ uri: url }} /> : <EmojiIcon />}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: 62,
    height: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    height: 62,
    width: 62,
    borderRadius: 1000,
    objectFit: 'cover',
  },
});

export default MenuUserImage;
