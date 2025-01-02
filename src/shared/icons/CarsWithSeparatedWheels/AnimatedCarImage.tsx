import { type LayoutChangeEvent, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { type TariffType } from '../Tariffs/TariffsCarImage';
import BasicCar from './Basic/Car';
import BasicWheel from './Basic/Wheel';
import BasicXLCar from './BasicXL/Car';
import BasicXLWheel from './BasicXL/Wheel';
import ComfortPlusCar from './ComfortPlus/Car';
import ComfortPlusWheel from './ComfortPlus/Wheel';
import DefaultCar from './Default/Car';
import DefaultWheel from './Default/Wheel';
import ElectricCar from './Electric/Car';
import ElectricWheel from './Electric/Wheel';
import DefaultCarShadow from './shadows/Default';
import TariffsCarShadow from './shadows/Tariffs';
import { type AnimatedCarImageProps, type CarAndWheelImages } from './types';

const tariffIconsByTariffType: Record<TariffType | 'Default', CarAndWheelImages> = {
  Basic: {
    car: BasicCar,
    wheel: BasicWheel,
  },
  BasicXL: {
    car: BasicXLCar,
    wheel: BasicXLWheel,
  },
  //TODO: Add correct car components when add "Business" tariff
  ComfortPlus: {
    car: ComfortPlusCar,
    wheel: ComfortPlusWheel,
  },
  Electric: {
    car: ElectricCar,
    wheel: ElectricWheel,
  },
  Default: {
    car: DefaultCar,
    wheel: DefaultWheel,
  },
};

const AnimatedCarImage = ({
  tariffType,
  containerStyle,
  animationDurationInMilSec = 1000,
  startDelayInMilSec = 0,
  withAnimation = true,
  leaveInStartPosition = false,
}: AnimatedCarImageProps) => {
  const tariffIcons = tariffIconsByTariffType[tariffType];
  const CarImage = tariffIcons.car;
  const WheelImage = tariffIcons.wheel;

  const wheelsRotation = useSharedValue(0);
  const carPosition = useSharedValue(0);
  const isReadyForAnimation = useSharedValue(false);

  const onLayout = (event: LayoutChangeEvent) => {
    if (withAnimation || leaveInStartPosition) {
      const { width } = event.nativeEvent.layout;
      carPosition.value = width;
    }
  };

  const startAnimation = () => {
    carPosition.value = withTiming(0, {
      duration: animationDurationInMilSec,
      easing: Easing.out(Easing.exp),
      reduceMotion: ReduceMotion.System,
    });
    wheelsRotation.value = withTiming(-1440, {
      duration: animationDurationInMilSec,
      easing: Easing.out(Easing.exp),
      reduceMotion: ReduceMotion.System,
    });
    isReadyForAnimation.value = false;
  };

  //There is timeout because "withDelay" works incorrect in this case
  //TODO: Try to rewrite it with "withDelay"
  const startAnimationWithTimeout = () => {
    setTimeout(() => {
      startAnimation();
    }, startDelayInMilSec);
  };

  useDerivedValue(() => {
    if (carPosition.value && !isReadyForAnimation.value && withAnimation) {
      isReadyForAnimation.value = true;
    }
  });

  useDerivedValue(() => {
    if (isReadyForAnimation.value) {
      if (startDelayInMilSec === 0) {
        runOnJS(startAnimation)();
      } else {
        runOnJS(startAnimationWithTimeout)();
      }
    }
  });

  const animatedRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${wheelsRotation.value}deg` }],
  }));

  const animatedPositionStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: carPosition.value }],
  }));

  const wheelsContainerStylesByTariffType: Record<TariffType | 'Default', ViewStyle> = {
    Basic: {
      justifyContent: 'space-between',
      paddingLeft: '14%',
      paddingRight: '13%',
      top: '-11%',
      aspectRatio: 7,
    },
    BasicXL: {
      justifyContent: 'space-between',
      paddingLeft: '11.5%',
      paddingRight: '17%',
      top: '-10%',
      aspectRatio: 7,
    },
    //TODO: Add styles when add "Business" components
    ComfortPlus: {
      justifyContent: 'space-between',
      paddingLeft: '10%',
      paddingRight: '15%',
      top: '-10.5%',
      aspectRatio: 7,
    },
    Electric: {
      justifyContent: 'space-between',
      paddingLeft: '9%',
      paddingRight: '12.5%',
      top: '-10.5%',
      aspectRatio: 6.5,
    },
    Default: {
      justifyContent: 'space-between',
      paddingLeft: '10.5%',
      paddingRight: '13.3%',
      top: '-11.6%',
      aspectRatio: 7,
    },
  };

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <Animated.View style={animatedPositionStyle}>
        <CarImage style={styles.carStyle} />
        <View style={[styles.wheelsContainer, wheelsContainerStylesByTariffType[tariffType]]}>
          <Animated.View style={animatedRotationStyle}>
            <WheelImage style={styles.wheel} />
          </Animated.View>
          <Animated.View style={animatedRotationStyle}>
            <WheelImage style={styles.wheel} />
          </Animated.View>
        </View>
        {tariffType === 'Default' ? (
          <DefaultCarShadow style={styles.defaultShadow} />
        ) : (
          <TariffsCarShadow style={styles.shadow} />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  carStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 3.5,
  },
  wheelsContainer: {
    flexDirection: 'row',
  },
  wheel: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: undefined,
    aspectRatio: 5,
    zIndex: -1,
    bottom: '5%',
  },
  defaultShadow: {
    position: 'absolute',
    width: '100%',
    height: undefined,
    aspectRatio: 6,
    zIndex: -1,
    bottom: '10%',
  },
});

export default AnimatedCarImage;
