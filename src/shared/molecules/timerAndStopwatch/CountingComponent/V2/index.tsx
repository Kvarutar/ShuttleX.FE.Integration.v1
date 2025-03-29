import { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../../core/locales/i18n';
import Text from '../../../../atoms/Text';
import { type CountingComponentProps } from './props';

const calculateTime = (difference: number) => {
  const totalSeconds = Math.max(Math.round(difference / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};

const CountingComponentWithoutI18n: React.FC<CountingComponentProps> = ({
  time,
  text,
  onAfterCountdownEnds,
  isWaiting,
  countingForwardStartTime, // in seconds
  style,
}) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTime(time));
  const [elapsedTime, setElapsedTime] = useState(countingForwardStartTime ?? 0); // in seconds
  const [isCountingForward, setIsCountingForward] = useState(false);
  const { t } = useTranslation();

  const getTimeContent = () => {
    if (isCountingForward) {
      const elapsedMinutes = Math.floor(elapsedTime / 60);
      return { content: elapsedMinutes.toString(), label: t('minutes_abbrev') };
    } else {
      if (timeLeft.hours > 0) {
        return { content: timeLeft.hours.toString(), label: t('hours_abbrev') };
      } else if (timeLeft.minutes > 0) {
        return { content: timeLeft.minutes.toString(), label: t('minutes_abbrev') };
      } else {
        return { content: timeLeft.seconds.toString(), label: t('seconds_abbrev') };
      }
    }
  };

  useEffect(() => {
    if (countingForwardStartTime) {
      setElapsedTime(countingForwardStartTime);
    }
  }, [countingForwardStartTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCountingForward) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 60);
      }, 60000);
    } else {
      const updateTime = () => {
        const difference = time - Date.now();

        if (difference <= 0) {
          onAfterCountdownEnds?.();
          clearInterval(interval);
          if (isWaiting) {
            setIsCountingForward(true);
          }
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        } else {
          setTimeLeft(calculateTime(difference));
        }
      };

      updateTime();
      interval = setInterval(updateTime, 1000);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isWaiting, isCountingForward]);

  const { content, label } = getTimeContent();

  return (
    <View style={styles.container}>
      {text ? (
        <Text style={style?.timerMainText}>{text}</Text>
      ) : (
        <View style={styles.timeUnitContainer}>
          <Text style={[style?.timerNumText, styles.timerNumText]}>{content}</Text>
          <Text style={[style?.timerSecondaryText, styles.timerSecondaryText]}>{label}</Text>
        </View>
      )}
    </View>
  );
};

const CountingComponent = (props: CountingComponentProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <CountingComponentWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerNumText: {
    fontFamily: 'Inter Medium',
  },
  timeUnitContainer: {
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  timerSecondaryText: {
    opacity: 0.31,
    fontFamily: 'Inter Medium',
  },
});

export default CountingComponent;
