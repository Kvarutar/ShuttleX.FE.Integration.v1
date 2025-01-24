import { StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Button from '../../shared/atoms/Button/v2';
import { ButtonShapes, CircleButtonModes } from '../../shared/atoms/Button/v2/props';
import LocationArrowImage2 from '../../shared/images/LocationArrowImage2';
import { type MapCameraModeButtonProps } from './types';

const constants = {
  rotationAnimationDuration: 300,
  defaultIconAngle: '45deg',
};

const MapCameraModeButton = ({ mode, onPress, style }: MapCameraModeButtonProps) => {
  const iconAngle = useSharedValue(constants.defaultIconAngle);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: iconAngle.get() }],
  }));

  const changeIconAngle = (angle: string) => {
    iconAngle.value = withTiming(angle, {
      duration: constants.rotationAnimationDuration,
    });
  };

  const getIcon = (): JSX.Element => {
    switch (mode) {
      case 'free': {
        runOnJS(changeIconAngle)(constants.defaultIconAngle);
        return <LocationArrowImage2 />;
      }
      case 'follow': {
        runOnJS(changeIconAngle)(constants.defaultIconAngle);
        return <LocationArrowImage2 colorMode="second" />;
      }
      case 'followWithCompass': {
        runOnJS(changeIconAngle)('0deg');
        return <LocationArrowImage2 colorMode="second" />;
      }
    }
  };

  return (
    <Button
      style={style}
      onPress={onPress}
      mode={CircleButtonModes.Mode2}
      shape={ButtonShapes.Circle}
      withBorder={false}
      withBackgroundColorOnPress={false}
    >
      <Animated.View style={[iconAnimatedStyle, styles.icon]}>{getIcon()}</Animated.View>
    </Button>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingBottom: 2,
  },
});

export default MapCameraModeButton;
