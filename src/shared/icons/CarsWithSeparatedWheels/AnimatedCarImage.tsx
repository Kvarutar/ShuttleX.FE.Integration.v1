import { type ImageStyle, type LayoutChangeEvent, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { type TariffType } from '../Tariffs/TariffsCarImage';
import BasicCar from './Basic/Car';
import BasicWheel from './Basic/Wheel';
import BasicXLCar from './BasicXL/Car';
import BasicXLWheel from './BasicXL/Wheel';
import BusinessEliteCar from './BusinessElite/Car';
import BusinessEliteWheel from './BusinessElite/Wheel';
import BusinessXCar from './BusinessX/Car';
import BusinessXWheel from './BusinessX/Wheel';
import ComfortEcoCar from './ComfortEco/Car';
import ComfortEcoWheel from './ComfortEco/Wheel';
import ComfortPlusCar from './ComfortPlus/Car';
import ComfortPlusWheel from './ComfortPlus/Wheel';
import DefaultCar from './Default/Car';
import DefaultWheel from './Default/Wheel';
import ElectricCar from './Electric/Car';
import ElectricWheel from './Electric/Wheel';
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
  BusinessX: {
    car: BusinessXCar,
    wheel: BusinessXWheel,
  },
  BusinessElite: {
    car: BusinessEliteCar,
    wheel: BusinessEliteWheel,
  },
  ComfortEco: {
    car: ComfortEcoCar,
    wheel: ComfortEcoWheel,
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
  const isDelayedAnimationStarted = useSharedValue(false);

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

  const startAnimationWithDelay = () => {
    carPosition.value = withDelay(
      startDelayInMilSec,
      withTiming(0, {
        duration: animationDurationInMilSec,
        easing: Easing.out(Easing.exp),
        reduceMotion: ReduceMotion.System,
      }),
    );

    wheelsRotation.value = withDelay(
      startDelayInMilSec,
      withTiming(-1440, {
        duration: animationDurationInMilSec,
        easing: Easing.out(Easing.exp),
        reduceMotion: ReduceMotion.System,
      }),
    );
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
      } else if (!isDelayedAnimationStarted.value) {
        runOnJS(startAnimationWithDelay)();
        isDelayedAnimationStarted.value = true;
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
    BusinessElite: {
      justifyContent: 'space-between',
      paddingLeft: '8%',
      paddingRight: '14.4 %',
      top: '-11.7%',
      aspectRatio: 6.5,
    },
    BusinessX: {
      justifyContent: 'space-between',
      paddingLeft: '7%',
      paddingRight: '16%',
      top: '-11.4%',
      aspectRatio: 6.5,
    },
    ComfortEco: {
      justifyContent: 'space-between',
      paddingLeft: '9.8%',
      paddingRight: '11%',
      top: '-9.5%',
      aspectRatio: 6.4,
    },
    Default: {
      justifyContent: 'space-between',
      paddingLeft: '10.5%',
      paddingRight: '13.3%',
      top: '-11.6%',
      aspectRatio: 7,
    },
  };

  const computedShadowStyles: Record<TariffType | 'Default', ImageStyle> = StyleSheet.create({
    Basic: {
      bottom: '11%',
    },
    BasicXL: {
      bottom: '8%',
    },
    ComfortPlus: {
      bottom: '10%',
    },
    Electric: {
      bottom: '10%',
    },
    BusinessElite: {
      bottom: '12%',
    },
    BusinessX: {
      bottom: '12%',
    },
    ComfortEco: {
      bottom: '7%',
    },
    Default: {
      bottom: '13%',
    },
  });

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
        <TariffsCarShadow style={StyleSheet.flatten([styles.shadow, computedShadowStyles[tariffType]])} />
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
  },
});

export default AnimatedCarImage;
