import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../../../../core/themes/v2/themeContext';
import CircularTimerIcon from '../../../../icons/CircularTimerIcon';
import CountingComponent from '../../CountingComponent/V2';
import { type TimerColorsType, type TimerProps, type TimerSizesType } from './props';

const timerSizes: TimerSizesType = {
  normal: {
    iconStrokeWidth: 6,
    timerSize: 92,
    numFontSize: 26,
    textFontSize: 17,
    marksHeight: 6,
    marksWidth: 1.6,
    opacity: 0.38,
  },
  big: {
    iconStrokeWidth: 10,
    timerSize: 160,
    numFontSize: 45,
    textFontSize: 30,
    marksHeight: 10,
    marksWidth: 2.7,
    opacity: 0.48,
  },
};

const Timer = ({
  time, // milliseconds
  onAfterCountdownEnds,
  isWaiting = false,
  style,
  sizeMode,
  colorMode,
  timerBackgroundColor,
  text,
  withCountdown = true,
  isWithMarks = false,
}: TimerProps) => {
  const { colors } = useTheme();

  const chooseColor = (backgroundColor: string) => (timerBackgroundColor ? timerBackgroundColor : backgroundColor);

  const timerColors: TimerColorsType = {
    main: {
      timerCustomBackgroundColor: chooseColor(colors.primaryColor),
      timerElemColor: colors.textPrimaryColor,
      strokeColor: colors.strokeColor,
    },
    neutral: {
      timerCustomBackgroundColor: chooseColor(colors.backgroundPrimaryColor),
      timerElemColor: colors.textPrimaryColor,
    },
    warning: {
      timerCustomBackgroundColor: chooseColor(colors.errorColor),
      timerElemColor: colors.textTertiaryColor,
      strokeColor: colors.iconTertiaryColor,
    },
    black: {
      timerCustomBackgroundColor: chooseColor(colors.backgroundTertiaryColor),
      timerElemColor: colors.iconTertiaryColor,
      strokeColor: colors.strokeColor,
    },
  };

  const { iconStrokeWidth, timerSize, numFontSize, textFontSize, marksHeight, marksWidth, opacity } =
    timerSizes[sizeMode];
  const { timerCustomBackgroundColor, timerElemColor, strokeColor } = timerColors[colorMode];

  const computedStyles = StyleSheet.create({
    timerWrapper: {
      width: timerSize,
      height: timerSize,
      backgroundColor: timerCustomBackgroundColor,
      borderColor: colors.borderColor,
    },
    timerNumText: {
      fontSize: numFontSize,
      color: timerElemColor,
    },
    timerMainText: {
      fontSize: textFontSize,
      color: timerElemColor,
    },
    timerSecondaryText: {
      color: timerElemColor,
      fontSize: textFontSize,
      opacity: opacity,
    },
  });

  return (
    <View style={[computedStyles.timerWrapper, styles.timerWrapper, style?.timerWrapper]}>
      <CircularTimerIcon
        initTime={time}
        size={timerSize}
        strokeWidth={iconStrokeWidth}
        marksHeight={marksHeight}
        marksWidth={marksWidth}
        opacity={opacity}
        strokeColor={strokeColor ? strokeColor : '#979797'}
        isWithMarks={isWithMarks}
        marksColor={timerElemColor}
      />
      {withCountdown && (
        <View style={[StyleSheet.absoluteFill, styles.timerTextWrapper]}>
          <CountingComponent
            time={time}
            text={text}
            isWaiting={isWaiting}
            onAfterCountdownEnds={onAfterCountdownEnds}
            style={{
              timerNumText: [computedStyles.timerNumText, style?.timerNumText],
              timerSecondaryText: [computedStyles.timerSecondaryText, style?.timerSecondaryText],
              timerMainText: [computedStyles.timerMainText, style?.timerMainText],
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timerWrapper: {
    borderRadius: 100,
    borderWidth: 0.5,
  },
  timerTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Timer;
