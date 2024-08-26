import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ButtonV1 } from '../../shared/atoms/Button/index';
import { ButtonV1Shapes } from '../../shared/atoms/Button/V1/props';
import LocationArrowImage2 from '../../shared/images/LocationArrowImage2';
import { type MapCameraModeButtonProps } from './types';

const constants = {
  rotationAnimationDuration: 300,
  defaultIconAngle: '31deg',
};

const MapCameraModeButton = ({ mode, onPress, style }: MapCameraModeButtonProps) => {
  const iconAngle = useSharedValue(constants.defaultIconAngle);

  const rotationAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: iconAngle.value }],
  }));

  const changeIconAngle = (angle: string) => {
    iconAngle.value = withTiming(angle, {
      duration: constants.rotationAnimationDuration,
    });
  };

  const getIcon = (): JSX.Element => {
    switch (mode) {
      case 'free': {
        changeIconAngle(constants.defaultIconAngle);
        return <LocationArrowImage2 />;
      }
      case 'follow': {
        changeIconAngle(constants.defaultIconAngle);
        return <LocationArrowImage2 type="filled" />;
      }
      case 'followWithCompass': {
        changeIconAngle('0deg');
        return <LocationArrowImage2 type="filled" />;
      }
    }
  };

  return (
    <ButtonV1 shape={ButtonV1Shapes.Circle} style={style} onPress={onPress}>
      <Animated.View style={rotationAnimatedStyle}>{getIcon()}</Animated.View>
    </ButtonV1>
  );
};

export default MapCameraModeButton;
