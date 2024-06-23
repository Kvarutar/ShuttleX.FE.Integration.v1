import { Image, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import MenuUserImageLineIcon2 from '../icons/MenuUserImageLineIcon2';

const MenuUserImage2 = ({ url, style }: { url: string; style?: StyleProp<ViewStyle> }) => (
  <View style={[styles.wrapper, style]}>
    <MenuUserImageLineIcon2 style={styles.line} />
    <Image style={styles.image} source={{ uri: url }} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: 142,
    height: 142,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 30,
    objectFit: 'cover',
  },
  line: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default MenuUserImage2;
