import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../../../../core/themes/themeContext';
import Text from '../../../../atoms/Text';
import { type AlertType } from './props';

const Alert = ({ text, textColor, backgroundColor, icon, isVisible }: AlertType): JSX.Element => {
  const { colors } = useTheme();

  const opacity = useSharedValue(isVisible ? 1 : 0);

  useEffect(() => {
    if (isVisible) {
      opacity.value = 1;
    } else {
      opacity.value = withTiming(0, { duration: 500 });
    }
  }, [opacity, isVisible]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor ?? colors.errorColor,
      justifyContent: icon ? 'space-between' : 'center',
    },
    label: {
      color: textColor ?? colors.textPrimaryColor,
    },
  });

  return (
    <Animated.View style={[styles.container, computedStyles.container, animatedStyles]}>
      <Text style={[computedStyles.label]}>{text}</Text>
      {icon}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 240,
    height: 44,
    borderRadius: 62,
    paddingHorizontal: 12,
  },
});

export default Alert;
