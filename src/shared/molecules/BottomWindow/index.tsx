import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import { type BottomWindowProps } from './props';

const animationDuration = 300;

const BottomWindow = ({ children, alerts, style, windowStyle }: BottomWindowProps): JSX.Element => {
  const { colors } = useTheme();
  const { backgroundPrimaryColor, weakShadowColor } = colors;
  const shadowProps = defaultShadow(weakShadowColor);

  const computedStyles = StyleSheet.create({
    bottomWindow: {
      backgroundColor: backgroundPrimaryColor,
    },
  });

  return (
    <Animated.View
      style={[styles.container, style]}
      entering={FadeIn.duration(animationDuration)}
      exiting={FadeOut.duration(animationDuration)}
    >
      {alerts && <View style={styles.alerts}>{alerts}</View>}
      <Shadow stretch {...shadowProps}>
        <View style={[computedStyles.bottomWindow, styles.bottomWindow, windowStyle]}>{children}</View>
      </Shadow>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alerts: {
    padding: 16,
    gap: 12,
  },
  bottomWindow: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: sizes.paddingHorizontal,
    paddingVertical: sizes.paddingVertical,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomWindow;
