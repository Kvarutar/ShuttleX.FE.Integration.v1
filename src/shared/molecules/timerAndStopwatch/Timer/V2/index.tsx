import { StyleSheet, View } from 'react-native';

import { lightPalette } from '../../../../../core/themes/v2/palettes/lightPalette';
import { useTheme } from '../../../../../core/themes/v2/themeContext';
import CircularTimerIcon from '../../../../icons/CircularTimerIcon';
import CountingComponent from '../../CountingComponent/V2';
import { TimerColorModes, type TimerProps, TimerSizesModes, type TimerSizesType } from './props';

const timerSizes: TimerSizesType = {
  s: {
    iconStrokeWidth: 6,
    timerSize: 92,
    numFontSize: 26,
    textFontSize: 17,
    marksHeight: 6,
    marksWidth: 1.6,
    opacity: 0.38,
    padding: 6,
    lineHeight: 10,
  },
  l: {
    iconStrokeWidth: 10,
    timerSize: 160,
    numFontSize: 45,
    textFontSize: 30,
    marksHeight: 10,
    marksWidth: 2.7,
    opacity: 0.48,
    padding: 8,
    lineHeight: 13,
  },
};
/**
 * Timer Component Props
 *
 * @param {number} time - The timer takes `time` in milliseconds.
 * Convert minutes to milliseconds using the `minToMilSec` function in Integration.
 * @param {function} [onAfterCountdownEnds] - A function that is called after the countdown ends.
 * @param {boolean} [isWaiting=false] - Set to `true` to start counting forward after the countdown ends.
 * @param {object} [style] - Custom styles for the timer.
 * @param {TimerSizesModes} sizeMode - The size of the timer, either `Normal` or `Big`.
 * @param {TimerColorModes} colorMode - Defines the color mode for the timer and its elements.
 * @param {string} [text] - Static text to display instead of the countdown timer.
 * @param {boolean} [withCountdown=true] - Set to `true` to display a countdown timer.
 */
const Timer = ({
  time, // milliseconds
  onAfterCountdownEnds,
  isWaiting = false,
  style,
  sizeMode = TimerSizesModes.S,
  colorMode = TimerColorModes.Mode1,
  text,
  withCountdown = true,
}: TimerProps) => {
  const { colors } = useTheme();

  const {
    iconStrokeWidth,
    timerSize,
    numFontSize,
    textFontSize,
    marksHeight,
    marksWidth,
    opacity,
    padding,
    lineHeight,
  } = timerSizes[sizeMode];
  const { backgroundColor, textColor, strokeColor, lineColor } = lightPalette.timerColorModes[colorMode];

  const computedStyles = StyleSheet.create({
    timerWrapper: {
      width: timerSize,
      height: timerSize,
      backgroundColor: backgroundColor,
      borderColor: colors.borderColor,
    },
    timerNumText: {
      fontSize: numFontSize,
      color: textColor,
    },
    timerMainText: {
      fontSize: textFontSize,
      color: textColor,
    },
    timerSecondaryText: {
      color: textColor,
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
        padding={padding}
        lineHeight={lineHeight}
        lineColor={lineColor}
        strokeColor={strokeColor ? strokeColor : '#979797'}
        marksColor={textColor}
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
