import { Platform, SafeAreaView as SafeAreaViewBase, StyleSheet, View } from 'react-native';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import { type SafeAreaViewProps } from './props';

const SafeAreaView = ({ children, containerStyle, wrapperStyle }: SafeAreaViewProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.backgroundPrimaryColor,
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
