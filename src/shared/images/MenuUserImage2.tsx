import { Image, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import EmojiIcon from '../icons/EmojiIcon';

const MenuUserImage2 = ({ url, style }: { url?: string; style?: StyleProp<ViewStyle> }) => (
  <View style={style}>
    {url ? <Image style={styles.image} source={{ uri: url }} /> : <EmojiIcon style={styles.icon} />}
  </View>
);

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    borderRadius: 1000,
    objectFit: 'cover',
  },
  icon: {
    height: 120,
    width: 120,
  },
});

export default MenuUserImage2;
