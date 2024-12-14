import { Image, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import { useTheme } from '../../core/themes/v2/themeContext';

const MenuUserImage2 = ({ url, style }: { url?: string; style?: StyleProp<ViewStyle> }) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    image: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  return (
    <View style={style}>
      {url ? (
        <Image style={styles.image} source={{ uri: url }} />
      ) : (
        <Image style={[styles.image, computedStyles.image]} source={require('../../assets/img/DefaultAvatar.png')} />
      )}
    </View>
  );
};

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
