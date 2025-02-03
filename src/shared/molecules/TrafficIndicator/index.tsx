import { type ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../../core/themes/v2/themeContext';
import { formatTime } from '../../../utils';
import Text from '../../atoms/Text';
import { TriangleIcon } from '../../icons/TriangleIcon';
import { type TrafficIndicatorProps, TrafficLevel } from './types';

const totalPercents = 100;

const trafficColor: Record<TrafficLevel, string> = {
  [TrafficLevel.Low]: '#C8FF00',
  [TrafficLevel.Average]: '#FFBF00',
  [TrafficLevel.High]: '#FF0000',
};

const parsePercents = (percent: string): number => {
  'worklet';
  return Number(percent.slice(0, -1));
};

const TrafficIndicator = ({
  currentPercent,
  segments,
  startDate,
  endDate,
  containerStyle,
}: TrafficIndicatorProps): JSX.Element => {
  const { colors } = useTheme();

  const [availableWidth, setAvailableWidth] = useState(0);
  const [triangleWidth, setTriangleWidth] = useState(0);
  const borderRightWidth = 2;

  const animatedProgress = useSharedValue(0);

  const localSegments = segments.slice(0);
  if (localSegments.length === 1 && localSegments[0]) {
    localSegments.push({ level: localSegments[0].level, percent: '100%' });
  }

  useDerivedValue(() => {
    const newProgress = (parsePercents(currentPercent) / totalPercents) * availableWidth;
    //TODO: Need test and maybe fix time duration
    animatedProgress.value = withTiming(Math.min(newProgress, availableWidth), { duration: 300 });
  });

  const animatedTriangleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedProgress.value - triangleWidth / 2 }],
  }));
  const animatedDashStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedProgress.value - borderRightWidth / 2 }],
  }));

  const progressBarStyle = useAnimatedStyle(() => ({
    width: animatedProgress.value,
  }));

  const computedStyles = StyleSheet.create({
    label: {
      color: colors.textQuadraticColor,
    },
    completedOverlay: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    completedOverlayDash: {
      width: borderRightWidth,
      backgroundColor: colors.backgroundTertiaryColor,
    },
  });

  return (
    <View style={containerStyle}>
      <View style={styles.trackWrapper} onLayout={event => setAvailableWidth(event.nativeEvent.layout.width)}>
        <Animated.View style={animatedTriangleStyle}>
          <TriangleIcon onLayout={event => setTriangleWidth(event.nativeEvent.layout.width)} />
        </Animated.View>

        <View style={styles.track}>
          <View style={styles.backgroundTrack}>
            {localSegments.reduce<ReactNode[]>((acc, segment, index) => {
              const segmentWidth = (parsePercents(segment.percent) / totalPercents) * availableWidth;
              const nextSegment = segments[index + 1];
              const endColor = nextSegment ? trafficColor[nextSegment.level] : trafficColor[segment.level];

              segmentWidth &&
                acc.push(
                  <LinearGradient
                    key={index}
                    colors={[trafficColor[segment.level], endColor]}
                    style={{ width: segmentWidth }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />,
                );

              return acc;
            }, [])}

            <Animated.View style={[styles.completedOverlay, computedStyles.completedOverlay, progressBarStyle]} />
            <Animated.View style={[styles.completedOverlay, computedStyles.completedOverlayDash, animatedDashStyle]} />
          </View>
        </View>
      </View>
      {startDate && endDate && (
        <View style={styles.timeLabels}>
          <Text style={[styles.label, computedStyles.label]}>{formatTime(startDate)}</Text>
          <Text style={[styles.label, computedStyles.label]}>{formatTime(endDate)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  trackWrapper: {
    alignSelf: 'stretch',
    gap: 4,
  },
  track: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  backgroundTrack: {
    flex: 1,
    flexDirection: 'row',
  },
  completedOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  label: {
    fontFamily: 'Inter Medium',
    lineHeight: 32,
  },
});

export default TrafficIndicator;
