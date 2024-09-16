import React, { useEffect, useState } from 'react';
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
  style,
}) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTime(time));
  const [elapsedTime, setElapsedTime] = useState(0);
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
    let interval: NodeJS.Timeout;

    if (isCountingForward) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 60);
      }, 60000);
    } else {
      const endTime = Date.now() + time;

      const updateTime = () => {
        const difference = endTime - Date.now();

        if (difference <= 0) {
          onAfterCountdownEnds?.();
          clearInterval(interval);
          if (isWaiting) {
            setIsCountingForward(true);
          }
        } else {
          setTimeLeft(calculateTime(difference));
        }
      };

      updateTime();
      interval = setInterval(updateTime, 1000);
    }

    return () => clearInterval(interval);
  }, [time, onAfterCountdownEnds, isWaiting, isCountingForward]);

  const { content, label } = getTimeContent();

  return (
    <View style={styles.container}>
      {text ? (
        <Text style={style?.timerMainText}>{text}</Text>
      ) : (
        <View style={styles.timeUnitContainer}>
          <Text style={style?.timerNumText}>{content}</Text>
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

  timeUnitContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  timerSecondaryText: {
    opacity: 0.31,
  },
});

export default CountingComponent;
