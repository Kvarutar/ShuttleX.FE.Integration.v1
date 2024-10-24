import { Platform, SafeAreaView as SafeAreaViewBase, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { type SafeAreaViewProps } from './props';

const SafeAreaView = ({ children, containerStyle, wrapperStyle, withTransparentBackground }: SafeAreaViewProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const iosPaddingVertical = insets.bottom ? 0 : sizes.paddingVertical / 2;

  const computedStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: withTransparentBackground ? 'transparent' : colors.backgroundPrimaryColor,
    },
    container: {
      paddingVertical: Platform.OS === 'android' ? sizes.paddingVertical : iosPaddingVertical,
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
