import { Image, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import { useTheme } from '../../core/themes/themeContext';

const MenuUserImage = ({ url, style }: { url?: string; style?: StyleProp<ViewStyle> }) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    image: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  return (
    <View style={[styles.wrapper, style]}>
      {url ? (
        <Image style={styles.image} source={{ uri: url }} />
      ) : (
        <Image style={[styles.image, computedStyles.image]} source={require('../../assets/img/DefaultAvatar.png')} />
      )}
    </View>
  );
};

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
