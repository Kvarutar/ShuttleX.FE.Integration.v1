import { Platform, SafeAreaView as SafeAreaViewBase, StyleSheet, View } from 'react-native';

import sizes from '../../../core/themes/sizes';
import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import { type SafeAreaViewProps } from './props';

const SafeAreaView = ({ children, containerStyle, wrapperStyle, withTransparentBackground }: SafeAreaViewProps) => {
  const { colors } = useThemeV1();

  const computedStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: withTransparentBackground ? 'transparent' : colors.backgroundPrimaryColor,
    },
    container: {
      paddingVertical: Platform.OS === 'android' ? sizes.paddingVertical : 0,
    },
  });

  return (
    <SafeAreaViewBase style={[styles.wrapper, computedStyles.wrapper, wrapperStyle]}>
      <View style={[styles.container, computedStyles.container, containerStyle]}>{children}</View>
    </SafeAreaViewBase>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: sizes.paddingHorizontal,
  },
});

export default SafeAreaView;
