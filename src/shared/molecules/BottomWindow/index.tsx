import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import sizes from '../../../core/themes/sizes';
import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import Shade from '../../atoms/Shade';
import { type BottomWindowProps } from './props';

const windowWidth = Dimensions.get('window').width;

const animationsDurations = {
  viewFade: 300,
  alerts: 200,
};

const BottomWindow = ({
  children,
  alerts,
  showAlerts = true,
  style,
  windowStyle,
  withShade = false,
}: BottomWindowProps): JSX.Element => {
  const { colors } = useThemeV1();
  const { backgroundPrimaryColor, weakShadowColor } = colors;
  const shadowProps = defaultShadow(weakShadowColor);

  const computedStyles = StyleSheet.create({
    bottomWindow: {
      backgroundColor: backgroundPrimaryColor,
    },
  });

  const alertsTranslateX = useSharedValue(0);

  useEffect(() => {
    if (showAlerts) {
      alertsTranslateX.value = withTiming(0, { duration: animationsDurations.alerts });
    } else {
      alertsTranslateX.value = withTiming(-windowWidth, { duration: animationsDurations.alerts });
    }
  }, [showAlerts, alertsTranslateX]);

  const alertsAnimatedStyles = useAnimatedStyle(() => ({ transform: [{ translateX: alertsTranslateX.value }] }));

  return (
    <>
      {withShade && <Shade />}
      <Animated.View
        style={[styles.container, style]}
        entering={FadeIn.duration(animationsDurations.viewFade)}
        exiting={FadeOut.duration(animationsDurations.viewFade)}
      >
        {alerts && <Animated.View style={[styles.alerts, alertsAnimatedStyles]}>{alerts}</Animated.View>}
        <Shadow stretch {...shadowProps}>
          <View style={[computedStyles.bottomWindow, styles.bottomWindow, windowStyle]}>{children}</View>
        </Shadow>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  alerts: {
    padding: 16,
    gap: 12,
  },
  bottomWindow: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
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
