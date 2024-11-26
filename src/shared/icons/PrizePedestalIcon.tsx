import { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Path, Rect, Stop, Text } from 'react-native-svg';

import i18nIntegration from '../../core/locales/i18n';

const numberColor = '#00000029'; //with opacity
const stringColor = '#00000066'; //with opacity

const animationDuration = 500;

type PrizePedestalIconProps = {
  containerStyle?: StyleProp<ViewStyle>;
  firstPlaceColored: boolean;
  secondPlaceColored: boolean;
  thirdPlaceColored: boolean;
};

const PrizePedestalIconWithoutI18n = ({
  containerStyle,
  firstPlaceColored,
  secondPlaceColored,
  thirdPlaceColored,
}: PrizePedestalIconProps) => {
  const { t } = useTranslation();

  const useOpacityAnimation = (placeColored: boolean) => {
    const alternateOpacity = useSharedValue(placeColored ? 1 : 0);
    const defaultOpacity = useSharedValue(placeColored ? 0 : 1);

    useEffect(() => {
      alternateOpacity.value = withTiming(placeColored ? 1 : 0, {
        duration: animationDuration,
        easing: Easing.inOut(Easing.ease),
      });
      defaultOpacity.value = withTiming(placeColored ? 0 : 1, {
        duration: animationDuration,
        easing: Easing.inOut(Easing.ease),
      });
    }, [placeColored, alternateOpacity, defaultOpacity]);

    const alternateAnimatedStyle = useAnimatedStyle(() => ({
      opacity: alternateOpacity.value,
    }));

    const defaultAnimatedStyle = useAnimatedStyle(() => ({
      opacity: defaultOpacity.value,
    }));

    return { alternateAnimatedStyle, defaultAnimatedStyle };
  };

  const { alternateAnimatedStyle: firstAlternateAnimatedStyle, defaultAnimatedStyle: firstDefaultAnimatedStyle } =
    useOpacityAnimation(firstPlaceColored);
  const { alternateAnimatedStyle: secondAlternateAnimatedStyle, defaultAnimatedStyle: secondDefaultAnimatedStyle } =
    useOpacityAnimation(secondPlaceColored);
  const { alternateAnimatedStyle: thirdAlternateAnimatedStyle, defaultAnimatedStyle: thirdDefaultAnimatedStyle } =
    useOpacityAnimation(thirdPlaceColored);

  const FirstPlace = (
    <Animated.View style={[firstDefaultAnimatedStyle]}>
      <Svg width="137" height="167" viewBox="0 0 137 167" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M20 0H117L137 43H0L20 0Z" fill="url(#paint1_linear)" />
        <Rect y="43" width="137" height="124" fill={'#FFFFFF'} />

        <Text x="68.5" y="130" fontSize="100" fill={numberColor} fontWeight="bold" textAnchor="middle">
          1
        </Text>
        <Text x="68.5" y="155" fontSize="11" fill={stringColor} fontWeight="bold" textAnchor="middle">
          {t('PrizePedestalIcon_firstPlaceTitle')}
        </Text>

        <Defs>
          <LinearGradient id="paint1_linear" x1="68.5" y1="0" x2="68.5" y2="43" gradientUnits="userSpaceOnUse">
            <Stop stopColor={'#F9F9F9'} />
            <Stop offset="1" stopColor={'#F4F4F4'} />
          </LinearGradient>
        </Defs>
      </Svg>
    </Animated.View>
  );

  const FirstPlaceColored = (
    <Animated.View style={[firstAlternateAnimatedStyle, StyleSheet.absoluteFill]}>
      <Svg width="137" height="167" viewBox="0 0 137 167" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M20 0H117L137 43H0L20 0Z" fill="url(#paint1_linear)" />
        <Rect y="43" width="137" height="124" fill={'#C5FB02'} />

        <Text x="68.5" y="130" fontSize="100" fill={numberColor} fontWeight="bold" textAnchor="middle">
          1
        </Text>
        <Text x="68.5" y="155" fontSize="11" fill={stringColor} fontWeight="bold" textAnchor="middle">
          {t('PrizePedestalIcon_firstPlaceTitle')}
        </Text>

        <Defs>
          <LinearGradient id="paint1_linear" x1="68.5" y1="0" x2="68.5" y2="43" gradientUnits="userSpaceOnUse">
            <Stop stopColor={'#AFDF04'} />
            <Stop offset="1" stopColor={'#B7EA00'} />
          </LinearGradient>
        </Defs>
      </Svg>
    </Animated.View>
  );

  const SecondPlace = (
    <Animated.View style={[secondDefaultAnimatedStyle]}>
      <Svg width="104" height="170" viewBox="0 0 104 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M20 30H117V63H0L20 30Z" fill="url(#paint2_linear)" />
        <Rect y="63" width="117" height="104" fill={'#F9F9F9'} />
        <Text x="55" y="150" fontSize="100" fill={numberColor} fontWeight="bold" textAnchor="middle">
          2
        </Text>
        <Defs>
          <LinearGradient id="paint2_linear" x1="58.5" y1="30" x2="58.5" y2="63" gradientUnits="userSpaceOnUse">
            <Stop stopColor={'#F9F9F9'} />
            <Stop offset="1" stopColor={'#F3F3F3'} />
          </LinearGradient>
        </Defs>
      </Svg>
    </Animated.View>
  );

  const SecondPlaceColored = (
    <Animated.View style={[secondAlternateAnimatedStyle, StyleSheet.absoluteFill]}>
      <Svg width="117" height="170" viewBox="0 0 117 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M20 30H117V63H0L20 30Z" fill="url(#paint2_linear)" />
        <Rect y="63" width="117" height="104" fill={'#AFDF04'} />
        <Text x="55" y="150" fontSize="100" fill={numberColor} fontWeight="bold" textAnchor="middle">
          2
        </Text>
        <Defs>
          <LinearGradient id="paint2_linear" x1="58.5" y1="30" x2="58.5" y2="63" gradientUnits="userSpaceOnUse">
            <Stop stopColor={'#AFDF04'} />
            <Stop offset="1" stopColor={'#B7EA00'} />
          </LinearGradient>
        </Defs>
      </Svg>
    </Animated.View>
  );

  const ThirdPlace = (
    <Animated.View style={[thirdDefaultAnimatedStyle]}>
      <Svg width="103" height="167" viewBox="0 0 103 167" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M100 50H-14V83H103L90 50Z" fill="url(#paint3_linear)" />
        <Rect width={103} height={84} transform="matrix(-1 0 0 1 103 83)" fill={'#F9F9F9'} />

        <Text x="50" y="160" fontSize="90" fill={numberColor} fontWeight="bold" textAnchor="middle">
          3
        </Text>

        <Defs>
          <LinearGradient id="paint3_linear" x1={61.5} y1={0} x2={61.5} y2={33} gradientUnits="userSpaceOnUse">
            <Stop stopColor={'#F9F9F9'} />
            <Stop offset="1" stopColor={'#F3F3F3'} />
          </LinearGradient>
        </Defs>
      </Svg>
    </Animated.View>
  );

  const ThirdPlaceColored = (
    <Animated.View style={[thirdAlternateAnimatedStyle, StyleSheet.absoluteFill]}>
      <Svg width="103" height="167" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M100 50H-14V83H103L90 50Z" fill="url(#paint3_linear)" />
        <Rect width={103} height={84} transform="matrix(-1 0 0 1 103 83)" fill={'#AFDF04'} />

        <Text x="50" y="160" fontSize="90" fill={numberColor} fontWeight="bold" textAnchor="middle">
          3
        </Text>

        <Defs>
          <LinearGradient id="paint3_linear" x1={61.5} y1={0} x2={61.5} y2={33} gradientUnits="userSpaceOnUse">
            <Stop stopColor={'#AFDF04'} />
            <Stop offset="1" stopColor={'#B7EA00'} />
          </LinearGradient>
        </Defs>
      </Svg>
    </Animated.View>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.relative}>
        {SecondPlace}
        {SecondPlaceColored}
      </View>
      <View style={styles.relative}>
        {FirstPlace}
        {FirstPlaceColored}
      </View>
      <View style={styles.relative}>
        {ThirdPlace}
        {ThirdPlaceColored}
      </View>
    </View>
  );
};

const PrizePedestalIcon = (props: PrizePedestalIconProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <PrizePedestalIconWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  container: {
    width: 343,
    height: 167,
    flexDirection: 'row',
  },
  relative: {
    position: 'relative',
  },
});

export default PrizePedestalIcon;
